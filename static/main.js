requirejs.config({
    appDir: "/static/",
    baseUrl: "js",
    paths: { 
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min'],
	'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min'],
        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min'],
        'domready': ['//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min'],
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery'],
        'jquery-ui' : ['jquery']
    }
});

require(['domready', 'jquery', 'bootstrap', 'jquery-ui'], 
	function(domReady, $) {
	    console.log("Loaded :)");    
	    domReady(function () {
		console.log('ready');

		$(window).resize(function () {
		    $(".workspace").height($(window).height());
		});
		$(".workspace").height($(window).height());
		
		$(".note").attr("contenteditable", "true").resizable({
		    resize: function (event, ui) {
			console.log('r', ui.size);
		    }
		}).draggable({
		    drag: function (event, ui) {
			console.log('d', ui.position);
		    }
		});
	    });
	    return {};
});

