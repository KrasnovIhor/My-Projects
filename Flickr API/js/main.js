"use strict";

$(document).ready(function () {
	function getPhotos(id) {
		const flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			data = id !== null ? {
				format: "json",
				id: id,
			} : {
				format: "json",
			}

		$.getJSON(flickerAPI, data).done(function (result) {
			$.each(result.items, function (i, item) {
				$("<img>").attr("src", item.media.m).appendTo("#photos");
			});
		});
	};

	$("#button-reg").click(function () {
		$("#photos img").remove();
		let id = null;

		getPhotos(id);
	});

	$("#button-id").click(function () {
		$("#photos img").remove();
		let id = "25053835@N03";

		getPhotos(id);
	});
}); 
