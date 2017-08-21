function setChosenProductToCookie(e){
	setCookie("chosenProduct",$(e.currentTarget).closest("div").attr("id"),10);
	window.location.href = './detail.html';
	e.preventDefault();
}

$(document).ready(function(){
	function createProduct(index, val){
		var product = $("<div>", {id:val.id, "class":val.category + " webshopProduct"});
		var link = $("<a>", {href: "#", onclick:"return setChosenProductToCookie(event)"})
		var image = $("<img>", {"alt":"test", "src":"../resources/img/" + val.imgSrc, "class":"productImg"});
		link.append(image);
		product.append(link);
		
		return product;
	}

	$.getJSON( "../resources/json/webshop.json", function( data ) {
	  var row;
	  $.each( data, function( index, val ) {
		var iteration = index + 1;
		$("#shopForm").append(createProduct(index, val));
	  });
	}).fail(function() {
		console.log( "An error occurred during fetching webshop data, please try again later." );
		//ToDo, popup a screen to contact Sören.
	});
});