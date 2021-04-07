$(document).ready(function () {
  $("#calendar").datepicker();

  (function autocomplete() {
    const availableTags = [],
      titleArr = [].slice.call(document.querySelectorAll(".item__header h2"));

    for (let i = 0; i < titleArr.length; i++) {
      availableTags.push(titleArr[i].innerHTML);
    }

    $("#tags").autocomplete({
      source: availableTags,
    });
  })();

});
