$(document).ready(function () {
  
	var wrapper = $(".wrapper");
	var button = $("#button")
	var colorsArr = [].slice.call(document.querySelectorAll(".wrapper div"));
	
	button.button();
	wrapper.sortable();
	
	colorsArr.sort((a, b) => a.id - b.id);

	button.click(function( event ) {
    event.preventDefault();
		wrapper.append(colorsArr);
  });

});
