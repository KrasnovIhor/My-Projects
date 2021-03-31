document.addEventListener("DOMContentLoaded", () => {
	// detect if the user is on ie 11
	const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	
	const listOfLinks = document.querySelectorAll("a[href^='#sectionLink");

	window.addEventListener("scroll", function () {
		var nav = document.querySelector("nav");
		nav.classList.toggle("sticky", window.scrollY > 0);
	});

	listOfLinks.forEach(function (link) {
		link.addEventListener('click',  () => {
			listOfLinks.forEach( (link) => {
				if (link.classList.contains('highlighted')) {
					link.classList.remove('highlighted');
				}
			});
			link.classList.add('highlighted');
			let ref = link.href.split('#sectionLink');
			ref = "#section" + ref[1];
			// ie 11 does not support smooth scroll, so we will simply scroll
			if (isIE11) {
				window.scrollTo(0, document.querySelector(ref).offsetTop);
			} else {
				window.scroll({
					behavior: 'smooth',
					left: 0,
					top: document.querySelector(ref).offsetTop
				});
			}
		})
	})
})