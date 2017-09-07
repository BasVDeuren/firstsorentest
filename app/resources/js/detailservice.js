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
			var startSize = parseFloat(priceAndSize.sizes.split("-")[0]);
			var endSize = parseFloat(priceAndSize.sizes.split("-")[1]);
			var step = 0.5;
			if(startSize >= 100){
				step = 10;
			}
			for(var i = startSize; i <= endSize; i += step){
				if(i != 0.5){
					var price = $("<span>", {"class":"col-xs-2"}).html("\u20AC" + priceAndSize.price);
					var size = $("<span>", {"class":"col-xs-1"}).html(i + ": ");
					var input = $("<input>", {id:""+cookieProduct.id + "-seperator-" + i, "type": "text", "class":"col-xs-2", "value": "0"})
					var paragraph = $("<p>", {"class": "row"});
					paragraph.append(size);
					paragraph.append(price);
					paragraph.append(input);
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
	
	$("#backButton").click(function(){
		window.location.href = './webshop.html';
	});
	
	$("#orderButton").click(function(){
		$("input").each(function(i, inputField){
			if($(inputField).val() > 0){
				var amount = $(inputField).val();
				var idAttr = $(inputField).attr("id");
				var id = idAttr.split("-seperator-")[0];
				var size = idAttr.split("-seperator-")[1];
				
				addToCart(id, size, amount);
			}
		});
	
		alert("Uw bestelling werd in acht genomen, ga naar uw winkelwagen om uw bestelling te zien.");
	});
});