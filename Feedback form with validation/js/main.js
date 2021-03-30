"use strict";

$(document).ready(function () {
	$("#form").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "../handler.php",
			data: $(this).serialize(),
			dataType: "json",
			success: function () {
				$('#success_message').show();
			},
		});
	})
}); 
