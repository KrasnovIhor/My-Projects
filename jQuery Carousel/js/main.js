"use strict";

$(document).ready(function() {
	// Cache DOM
	let $slider = $('#slider'),
		$slideContainer = $slider.find('.slides'),
		$slides = $slideContainer.find('.slide');
	
	//Slider event
	$(window).on('load resize orientationchange', function () {
		let width = $($slides).css('width').slice(0, -2),
			currentSlide = 1,
			position = 0,
			sliderStart = {
				'-webkit-transform': 'translateX(0px)',
				'-moz-transform': 'translateX(0px)',
				'-ms-transform': 'translateX(0px)',
				'-o-transform': 'translateX(0px)',
				'transform': 'translateX(0px)',
			},
			sliderEnd = {
				'-webkit-transform': `translateX(-${width*($slides.length - 1)}px)`,
				'-moz-transform': `translateX(-${width*($slides.length - 1)}px)`,
				'-ms-transform': `translateX(-${width*($slides.length - 1)}px)`,
				'-o-transform': `translateX(-${width*($slides.length - 1)}px)`,
				'transform': `translateX(-${width*($slides.length - 1)}px)`
			};
			
		function sliderMove() {
			$slideContainer.css({
				'-webkit-transform': `translateX(${position}px)`,
				'-moz-transform': `translateX(${position}px)`,
				'-ms-transform': `translateX(${position}px)`,
				'-o-transform': `translateX(${position}px)`,
				'transform': `translateX(${position}px)`,
			});
		};
		
		$('.next').on('click', function () {
			position -= width;
			currentSlide++;
			sliderMove();

			if (currentSlide === $slides.length + 1) {
				currentSlide = 1;
				position = 0;
				$slideContainer.css(sliderStart);
			};		
		});

		$('.prev').on('click', function () {
			position += +width;
			currentSlide--;
			sliderMove();

			if (currentSlide === 0) {
				currentSlide = $slides.length;
				position = -width * ($slides.length - 1);
				$slideContainer.css(sliderEnd);
			};		
		});
	});

});