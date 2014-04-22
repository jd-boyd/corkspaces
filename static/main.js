requirejs.config({
    appDir: "/static/",
    baseUrl: "/static/",
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min'],
	'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min'],
        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min'],
        'domready': ['//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min'],
	'backbone': ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'],
	'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min']
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery'],
        'jquery-ui' : ['jquery'],
	'backbone': {
	    deps: ['underscore', 'jquery'],
	    exports: 'Backbone'
	}
    }
});

require(['domready', 'jquery', 'underscore', 'backbone', 
	 'models', 'views',
	 'bootstrap', 'jquery-ui'], 
	function(domReady, $, _, Backbone, models, views) {
	    "use strict";
	    console.log("Loaded :)");    

	    window.workspace = new models.Workspace(workspace_data);
	    window.entries = new models.Entries(entries_data);
	    console.log('models inited');

	    domReady(function () {
		console.log('ready');

		$(window).resize(function () {
		    $(".workspace").height($(window).height());
		});
		$(".workspace").height($(window).height());

		window.ws_view = new views.Workspace({
		    el: $('.workspace'),
		    model: window.workspace,
		    collection: window.entries
		});
		window.ws_view.render();

		console.log('done');
	    });
});

