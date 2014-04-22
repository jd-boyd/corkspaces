define(['domready', 'jquery', 'underscore', 'backbone'],
    function(domReady, $, _, Backbone) {
	"use strict";
	var Workspace = Backbone.Model.extend(
	    {}
	);

	var Entry = Backbone.Model.extend(
	    {
		defaults: {
		    width: 200,
		    height: 200,
		    content: 'New Note!'
		},
		initialize: function () {
		},
		url : function() {
		    // Important! 
		    // In this case, POST to '/donuts' and PUT to '/donuts/:id'
		    return this.id ? '/api/1/entry/' + this.id : '/api/1/entry';
		},
		changed: function () {
		    console.log('changed');
		    this.save();
		}
		    
	    }
	);
	var Entries = Backbone.Collection.extend(
	    {
		model: Entry,
		url: '/api/1/entries'
	    }
	);
	
	return {
	    Workspace: Workspace,
	    Entry: Entry,
	    Entries: Entries
	};
    })
