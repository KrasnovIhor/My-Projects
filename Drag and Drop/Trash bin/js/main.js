$(document).ready(function () {
	
	const delay = 80;

	$("#photo-grid img").draggable();

	$(".trash").droppable({
		drop: function (event, ui) {
			var droppedItem = $(ui.draggable);
			for (let i = 1; i <= 5; i++) {
				(function () {
					setTimeout(function () {
						droppedItem.attr({ src: './img/epufff' + i + '.png' });
					}, i * delay);
				})();
			}
				setTimeout(function () { $(droppedItem).addClass("removed"); }, delay * 5);
		},
		hoverClass: "highlight highlight-accept",
		accept: "#photo-grid img",
	});
});
