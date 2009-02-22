if(!window.com){
    window.com = {};
}
com.sarahehorne = {}
com.sarahehorne.carousel = function(){
    function startCarousel(){
	showCovers();
    }
    function showCovers(){
	$("#carousel_wrapper").fadeIn();
	var viewWidth = $("#carousel_wrapper").width();
	var carouselWidth = $("#carousel").width();
	var targetLeft = -(carouselWidth-viewWidth);
	$("#carousel").animate({opacity: 1.0}, 1000).animate({
		left: targetLeft+"px"
		    },1500).animate({
			    left: "0px"
				},1500, listenForMouse);
    }
    function listenForMouse(){
	$("#carousel_wrapper").mousemove(function(e){
		var mouseLeft = e.pageX - $("#carousel_wrapper").offset().left;
		var carouselWidth = $("#carousel_wrapper").width();
		var carouselLeft = parseInt($("#carousel_wrapper").css('left'));
		
		if(mouseLeft > (carouselWidth/2)){
		    
		    $("#carousel").css('left', (carouselLeft+1) + 'px');
		}else{
		    $("#carousel").css('left', (carouselLeft-1) + 'px');
		}
		
		window.status = e.pageX +" - "+ $("#carousel_wrapper").offset().left;
		//window.status = $("#carousel").scrollLeft();
		
		//$('#status').html(e.pageX +', '+ e.pageY);
		});
    }
    return {
	init:function(){
	    jQuery.easing.def = 'easeOutQuad';
	    startCarousel();
	}
    }
}();

$(window).load(function() {
	com.sarahehorne.carousel.init();
	});
