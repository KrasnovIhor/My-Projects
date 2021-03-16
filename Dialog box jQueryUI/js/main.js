$(document).ready(function () {
  
  var dialog = $("#dialog");

  dialog.dialog({
    autoOpen: false,
    width: 400,
    buttons: [
      {
        text: "Ok",
        click: function() {
          $( this ).dialog( "close" );
        }
      },
      {
        text: "Cancel",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ]
});

  // Link to open the dialog
  $( "#dialog-link" ).click(function( event ) {
    event.preventDefault();
    dialog.dialog("open");
  });
})
