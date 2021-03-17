$(document).ready(function () {
	
	$("#calendar").datepicker();

	var availableTags = [];
	var title_array = Array.prototype.slice.call(document.querySelectorAll('.item__header h2'));
	
	function addTags() {
		for (let i = 0; i < title_array.length; i++) {
			availableTags.push(title_array[i].textContent);
		}
	}

	addTags();

	$( "#tags" ).autocomplete({
			source: availableTags
	});
	
});