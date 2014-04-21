
define(['domready', 'jquery', 'underscore', 'backbone'],
    function(domReady, $, _, Backbone) {
	"use strict";
	var Entry = Backbone.View.extend({
	    className: "note",
	    events: {
		'click': 'clicked'
		
	    },
	    initialize: function () {
		_.bindAll(this, 'render', 'resize', 'drag', 'edit', 'clicked');
		this.mode = 'drag';
	    },
	    clicked: function (evt) {
		evt.stopPropagation();

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

		var handle = $("<div>").addClass('handle');
		
		this.$el.append(handle);

		this.content = $("<div>").addClass('content')
		    .html(this.model.get('content'))
		    .prop("contentEditable", "true")
		    .on('input', this.edit);

		this.$el.append(this.content);
		this.$el.resizable({
		    resize: this.resize
		}).draggable({
		    drag: this.drag,
		    handle: handle
		});

		return this;
	    }
	}
	);

	var Workspace = Backbone.View.extend({
	    className: "note",
	    events: {
		'click': 'clicked'
	    },
	    initialize: function () {
		_.bindAll(this, 'render', 'clicked');
	    },
	    clicked: function (evt) {
		console.log('clicked BG', evt);
		window.entries.create({x: evt.offsetX, y: evt.offsetY});
	    }

	    });
	

	return {
	    Entry: Entry,
	    Workspace: Workspace
	    };
});
