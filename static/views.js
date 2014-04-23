define(['domready', 'jquery', 'underscore', 'backbone'],
    function(domReady, $, _, Backbone) {
	"use strict";

	var Entry = Backbone.View.extend({
	    className: "note",
	    events: {
		'click': 'clicked',
		'click .trash': 'trash'
	    },
	    initialize: function () {
		_.bindAll(this, 'render', 'resize', 'drag', 'edit', 'clicked',
			 'trash', 'unselect');
		this.mode = 'drag';
	    },
	    deleted: false,
	    trash: function (evt) {
		evt.stopPropagation();
		this.deleted = true;
		console.log('trash');
		this.model.destroy();
		this.remove();
	    },
	    clicked: function (evt) {
		evt.stopPropagation();
		console.log('note click');
		if (this.deleted) {
		    return;
		}
		this.trigger('click', this);
		this.$el.addClass('selected');
		this.$el.resizable({
		    resize: this.resize
		})
	    },
	    unselect: function () {
		if (this.deleted) {
		    return;
		}
		this.$el.removeClass('selected');
		this.$el.resizable('destroy');
	    },
	    resize: function (event, ui) {
		console.log('r', ui.size);
		this.model.set({width: ui.size.width,
				height: ui.size.height});
		this.model.save();

	    },
	    drag: function (event, ui) {
		console.log('d', ui.position);
		this.model.set({x: ui.position.left,
				y: ui.position.top});
		this.model.save();
	    },
	    edit: function () {
		console.log('edit');
		this.model.set({content: this.content.html()});
		this.model.save();
	    },
	    render: function () {
		this.$el.css({left: this.model.get('x'),
			      top: this.model.get('y'),
			      width: this.model.get('width'),
			      height: this.model.get('height')
			      });

		var trash = $("<div>").addClass("trash glyphicon glyphicon-trash");
		this.$el.append(trash);

		var handle = $("<div>").addClass('handle');
		this.$el.append(handle);

		this.content = $("<div>").addClass('content')
		    .html(this.model.get('content'))
		    .prop("contentEditable", "true")
		    .on('input', this.edit);

		this.$el.append(this.content);
		this.$el.draggable({
		    stop: this.drag,
		    handle: handle
		});

		return this;
	    }
	}
	);

	var Workspace = Backbone.View.extend({
	    className: "workspace",
	    events: {
		'click': 'clicked'
	    },
	    initialize: function () {
		_.bindAll(this, 'render', 'clicked');
		console.log('ws view init');
	    },
	    current_note: null,
	    clicked: function (evt) {
		console.log('clicked BG', evt);
		var new_note = this.collection.create({x: evt.offsetX, 
						       y: evt.offsetY + 50});
		var v = new Entry({model: new_note});
		this.listenTo(v, 'click', this.note_select);
		this.$el.append(v.render().el);
	    },
	    note_select: function (note_view) {
		console.log('note select', note_view.model.id);
		if (this.current_note && !this.current_note.deleted) {
		    this.current_note.unselect();
		}
		this.current_note = note_view;
	    },
	    render: function () {
		console.log('ws render');
		console.log(this.collection);
		this.collection.each(function(e) {
		    console.log('entry', e);
		    var v = new Entry({model: e});
		    this.listenTo(v, 'click', this.note_select);
		    this.$el.append(v.render().el);
		}, this);
	    }

	    });
	

	return {
	    Entry: Entry,
	    Workspace: Workspace
	    };
});
