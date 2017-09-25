var addToCart = function(id, size, amount){
	var itemAlreadyInCart = getItemFromCart (id, size);
	if(itemAlreadyInCart !== undefined){
		amount = parseInt(amount) + parseInt(itemAlreadyInCart.amount);
		removeFromCart(id, size);
	}
	
	var cartJSON = getCookie( "cart" );
	var cart;
	if(cartJSON === undefined || cartJSON === null || cartJSON == ""){
		cart = [];
	} else {
		cart = JSON.parse(cartJSON);
	}
	var item = {
			"id": id,
			"size": size,
			"amount": amount
	};
	cart.push(item);
	var jsonCart = JSON.stringify( cart );
	setCookie("cart", jsonCart, 20);
}

var getItemFromCart = function(id, size) {
	var resultCartItem;
	var cartJSON = getCookie( "cart" );
	var cart;
	if(cartJSON === undefined || cartJSON === null || cartJSON == ""){
		cart = [];
	} else {
		cart = JSON.parse(cartJSON);
	}
	$(cart).each(function(index, cartItem) {
		if (cartItem.id == id && cartItem.size == size) {
			resultCartItem = cartItem;
			return;
		}
	});
	return resultCartItem;
}

var removeFromCart = function(id, size){
	var cartJSON = getCookie("cart");
	if(cartJSON !== null && cartJSON !== undefined && cartJSON !== ""){
		var cart = JSON.parse(cartJSON);
		var i = -1;
		$(cart).each(function(index, item){
			if(item.id == id && item.size == size){
				i = index;
			}
		});
		if( i > -1 ) {
			cart.splice(i, 1);
		}
		var jsonCart = JSON.stringify(cart);
		setCookie( "cart", jsonCart, 20);
	}
}

var removeElement = function(element){
	var id = $(element).closest(".shoppingCartItem").data("id");
	removeFromCart(id, $(element).parent("div").find(".size").attr("data-size"));
	$(element).closest(".shoppingCartItem").remove();
}

var items;
var itemsLoaded = false;

$(document).ready(function(){
	function fillItemData(){
		$(".needItemData").each(function(index, val){
			$(val).removeClass("needItemData");
			var type = $(val)[0].tagName;
			var item = getItemById(items.responseJSON, $(val).closest("div .shoppingCartItem").data("id"));
			if(type == "IMG"){
				$(val).attr("src", "../resources/img/" + item.imgSrc);
				$(val).attr("class", "productImg");
			} else {
				if($(val).data("type") == "price"){
					$(val).html($(val).html() + getPriceForSize(item, $(val).closest("div").find("p.size").data("size")));
				} else {
					$(val).html($(val).html() + item[$(val).data("type")]);
				}
			}
		});
	}

	var shoppingCartDiv = $("#cartView");
	items = getItems(function(){itemsLoaded=true;});
	
	var cartJSON = getCookie("cart");
	if(cartJSON !== null && cartJSON !== undefined && cartJSON !== ""){
		var cart = JSON.parse(cartJSON);
		$(cart).each(function(i, cartItem){
			var div = $("<div>", {"data-id":cartItem.id, "class": "shoppingCartItem row"});
			var imgDiv = $("<div>", {"class":"col-lg-2 col-md-4 col-sm-4 col-xs-12"});
			var img = $("<img>", {"class": "needItemData"});
			imgDiv.append(img);
			var contentDiv = $("<div>", {"class": "col-lg-9 col-md-7 col-sm-8 col-xs-12"});
			var pName = $("<p>",{"class": "needItemData", "data-type": "name"}).html("Naam: ");
			var pAmount = $("<p>",{}).html("Aantal: " + cartItem.amount);
			var pSize = $("<p>",{"class": "size", "data-size": cartItem.size}).html("Maat: " + cartItem.size);
			var pPrice = $("<p>",{"class": "needItemData", "data-type": "price"}).html("Prijs: €");
			var button = $("<button>", {"onclick": "removeElement(this)"}).html("remove");
			contentDiv.append(pName);
			contentDiv.append(pAmount);
			contentDiv.append(pSize);
			contentDiv.append(pPrice);
			contentDiv.append(button);
			div.append(imgDiv);
			div.append(contentDiv);
			shoppingCartDiv.append(div);
		});
	}
	
	var interval = setInterval(function(){
		if(itemsLoaded){
			clearInterval(interval);
			fillItemData();
		}
	}, 200);
	
	$("#proceed").click(function(){
		window.location.href="confirmation.html";
	});
	
	$("#goShopping").click(function(){
		window.location.href="webshop.html";
	});
});