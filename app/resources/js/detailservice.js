function pickSizePriceSelection(element){
	$("#sizeAndPrices button.btn-ippon").html($(element).html() + " <span class=\"caret\"></span>");
	$("#amountDiv").show();
	$("#amount").attr("data-size", $(element).parent("li").data("size"));
	$("#amount").attr("data-id", $(element).parent("li").data("id"));
}

$(document).ready(function(){
	$("#amountDiv").hide();

	function setProductDataByWebshopProducts(products){
		var cookieProduct;
		$.each(products, function( index, product ) {
			if(product.id == getCookie("chosenProduct")){
				cookieProduct = product;
				return false;
			}
		});
		
		$("#detailImage img").attr("src", "../resources/img/" + cookieProduct.imgSrc);
		if(cookieProduct.pdfSrc !== undefined){
			var productPdf = $("<a>", {"href":"../resources/files/" + cookieProduct.pdfSrc}).html(cookieProduct.pdfSrc);
			$("#detailInfo #moreInfo").append(productPdf);
		} else {
			$("#detailInfo #moreInfo").parent("p").remove();
		}
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
					var aSizePrice = $("<a>", {"href":"#", "onclick": "pickSizePriceSelection(this)"}).html(i + " - &euro;" + priceAndSize.price);
					var liSizePrice = $("<li>", {"data-id": cookieProduct.id, "data-size": i, "data-price": priceAndSize.price}).html(aSizePrice);
					$("#detailInfo #sizeAndPriceDropdown").append(liSizePrice);
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
		var amount = $("#amount").val();
		var size = $("#amount").data("size");
		var id = $("#amount").data("id");
		addToCart(id, size, amount);
	
		alert("Uw bestelling werd in acht genomen, ga naar uw winkelwagen om uw bestelling te zien.");
	});
});