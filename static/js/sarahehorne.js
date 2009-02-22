if(!window.com){
    window.com = {};
}
com.sarahehorne = {}
com.sarahehorne.carousel = function(){
    function startCarousel(){
			
			showCovers();
    }
    function showCovers(){
			$("#carousel_wrapper").show();
			var viewWidth = $("#carousel_wrapper").width();
			var carouselWidth = $("#carousel").width();
			var targetLeft = -(carouselWidth-viewWidth);
			$("#carousel").css('left', (targetLeft/2)+"px");
			startCarouselControls();
			/*$("#carousel").animate({opacity: 1.0}, 1000).animate({
				left: targetLeft+"px"
		   	},1000)
				.animate({
			    left: (targetLeft/2)+"px"
				},1000, startCarouselControls);*/
    }

		var minContraint;
		var maxContraint;
		var mouseXOffset;
		var carouselAnimationId;
    function startCarouselControls(){
			var carouselViewportWidth = $("#carousel_wrapper").width();
			var carouselWidth = $("#carousel").width();
			var itemWidth = $(".carousel_item:first").width();
			maxDistance = carouselViewportWidth/2 - 30;
			minContraint = -carouselWidth+(carouselViewportWidth/2)+(itemWidth/2);
			maxContraint = (carouselViewportWidth/2)-(itemWidth/2);
			
			$("#carousel_wrapper").hover(startListeningForMouse,stopListeningForMouse)
			$("#carousel_wrapper").mousemove(updateMousePosition);
			/*function(e){
				var mouseLeft = e.pageX - $("#carousel_wrapper").offset().left;
				var carouselViewportWidth = $("#carousel_wrapper").width();
				var carouselWidth = $("#carousel").width();
				var carouselLeft = parseInt($("#carousel").css('left'));

				var itemWidth = $(".carousel_item:first").width();
				console.log('itemWidth = ' + itemWidth);				
				var targetX = (mouseLeft > (carouselViewportWidth/2))?(carouselLeft+10):(carouselLeft-10);
				var minContraint = -carouselWidth+(carouselViewportWidth/2)+(itemWidth/2);
				var maxContraint = (carouselViewportWidth/2)-(itemWidth/2);
				
				if(targetX<=minContraint){
					targetX = minContraint;
				}
				if(targetX>=maxContraint){
					targetX = maxContraint;
				}
		    $("#carousel").css('left', targetX + 'px');
			});*/
    }

		function startListeningForMouse(){
			carouselAnimationId = setInterval(animateCarousel, 50);
		}
		
		function stopListeningForMouse(){
			clearInterval(carouselAnimationId);
		}
		
		var maxSpeed = 40;
		var minDistance = 30;
		var maxDistance;
		function animateCarousel(){
			//Check if its not right in the middle
			if(Math.abs(mouseXOffset) > minDistance){
				
				var amountToMove = mouseXOffset;
				//Max distance away from center to get to maxSpeed
				if(Math.abs(amountToMove)>maxDistance){
					if(amountToMove>0){
						amountToMove = maxSpeed;
					}else{
						amountToMove = -maxSpeed;
					}
				}else{
					//otherwise scale the distance to mouse posish
					amountToMove = (mouseXOffset/(maxDistance - minDistance))*maxSpeed;
				}
				//Make the direction go with the mouse 
				amountToMove *= -1;
				amountToMove += parseInt($("#carousel").css('left'));	
				setCarouselX(amountToMove);
			}
		}
		
		function updateMousePosition(e){
			mouseXOffset = e.pageX - $("#carousel_wrapper").offset().left - ($("#carousel_wrapper").width()/2);
		}
		
		function  setCarouselX(x){
			if(x<=minContraint){
				x = minContraint;
			}
			if(x>=maxContraint){
				x = maxContraint;
			}
	    $("#carousel").css('left', x + 'px');
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
