"use strict";

window.onload = () => {
	const carouselSlide = document.querySelector(".carousel-slide"),
		carouselImages = carouselSlide.querySelectorAll("img"),
		prevBtn = document.getElementById("prevBtn"),
		nextBtn = document.getElementById("nextBtn"),
		autoSlideBtn = document.getElementById("autoSlide"),
		stopSlideBtn = document.getElementById("stopSlide"),
		modal = document.getElementById("myModal"),
		modalImg = document.getElementById("img01"),
		captionText = document.getElementById("caption"),
		closeBtn = document.getElementsByClassName("close")[0],
		size = -carouselImages[0].clientWidth,
		pause = 3000,
		prefixes = [
			"webkitTransform",
			"mozTransform",
			"msTransform",
			"oTransform",
			"transform",
		];
	let counter = 1;

	const slideTransform = () => {
		prefixes.forEach((el) => {
			carouselSlide.style[el] = "translateX(" + size * counter + "px)";
		});
	};

	slideTransform();

	nextBtn.addEventListener("click", () => {
		if (counter >= carouselImages.length - 1) return;

		carouselSlide.style.transition = "transform .4s ease-in-out";
		counter++;

		slideTransform();
	});

	prevBtn.addEventListener("click", () => {
		if (counter <= 0) return;

		carouselSlide.style.transition = "transform .4s ease-in-out";
		counter--;

		slideTransform();
	});

	carouselSlide.addEventListener("transitionend", () => {
		if (carouselImages[counter].id === "lastClone") {
			carouselSlide.style.transition = "none";
			counter = carouselImages.length - 2;
			slideTransform();
		}

		if (carouselImages[counter].id === "firstClone") {
			carouselSlide.style.transition = "none";
			counter = carouselImages.length - counter;
			slideTransform();
		}
	});

	//Auto slide event

	const autoSlider = () => {
		let interval = setInterval(() => {
			carouselSlide.style.transition = "transform .4s ease-in-out";
			counter++;
			slideTransform();
		}, pause);

		stopSlideBtn.addEventListener("click", () => {
			clearInterval(interval);
		});
	};

	autoSlideBtn.addEventListener("click", () => {
		autoSlider();
	});

	//Modal window event

	carouselImages.forEach((i) => {
		i.addEventListener("click", () => {
			modal.style.display = "block";
			modalImg.src = i.src;
			captionText.innerHTML = i.alt;
		});
	});

	closeBtn.addEventListener("click", function () {
		modal.style.display = "none";
	});
};
