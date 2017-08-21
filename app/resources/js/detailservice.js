$(document).ready(function(){
	function setProductDataByWebshopProducts(products){
		var cookieProduct;
		$.each(products, function( index, product ) {
			if(product.id == getCookie("chosenProduct")){
				cookieProduct = product;
				return false;
			}
		});
		
		$("#detailImage img").attr("src", "../resources/img/" + cookieProduct.imgSrc);
		$("#detailInfo #name").html(cookieProduct.name);
		$("#detailInfo #niveau").html(cookieProduct.niveau);
		$("#detailInfo #brand").html(cookieProduct.brand);
		$.each(cookieProduct.pricePerSize, function(index, priceAndSize){			
			var startSize = parseInt(priceAndSize.sizes.split("-")[0]);
			var endSize = parseInt(priceAndSize.sizes.split("-")[1]);
			var step = 0.5;
			if(startSize >= 100){
				step = 10;
			}
			for(var i = startSize; i < endSize; i += step){
				if(i != 0.5){
					var price = $("<span>").html(priceAndSize.price);
					var size = $("<span>").html(i);
					var paragraph = $("<p>");
					paragraph.append(size);
					paragraph.append(": \u20AC");
					paragraph.append(price);
					$("#detailInfo #pricePerSize").append(paragraph);
				}
			}
		});
	}

	$.getJSON( "../resources/json/webshop.json", function( data ) {
	  setProductDataByWebshopProducts(data);
	}).fail(function() {
		console.log( "An error occurred during fetching webshop data, please try again later." );
		//ToDo, popup a screen to contact Sören.
	});
});