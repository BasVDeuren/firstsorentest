$(document).ready(function(){
	$.getJSON( "../resources/json/webshop.json", function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });
	}).done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  });
});