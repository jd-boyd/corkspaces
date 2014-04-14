$(document).ready(function () {
    
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
