$(document).ready(function () {
	
	$("#calendar").datepicker();
	
	(function autocomplete() {
		var availableTags = [],
			titleArr = [].slice.call(document.querySelectorAll('.item__header h2'));

		for (let i = 0; i < titleArr.length; i++) {
			availableTags.push(titleArr[i].innerHTML);
		}

		$("#tags").autocomplete({
			source: availableTags
		});
	})();

	// $("nav ul li a").click(function (event) {
	// 	event.preventDefault();
	// 	$.ajax({
	// 		url: this.href,
	// 		success: function (html) {
	// 			$("main").empty().append(html);
	// 			if ($("nav ul li a").attr("href") === "ajax/about.html") {
	// 				$("head").append("<script src="js/index.js"></script>");
	// 			} else {
	// 				$("head script").remove();
	// 			}
	// 		}
	// 	});
	// })

});