$(document).ready(function () {
  
  $("#calendar").datepicker();

  var availableTags = [
      "Cruiser",
      "Brera Blue",
      "XDS Retro Alloy",
      "Cafe Racer",
      "Retro 5.6",
      "Liv Beliv F 2021",
  ];
  
  $( "#tags" ).autocomplete({
      source: availableTags
  });
  
});