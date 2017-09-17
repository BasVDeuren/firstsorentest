var addToCart = function(id, size, amount){
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
	var id = $(element).parent("div").find("p").attr("id");
	removeFromCart(id, $(element).parent("div").find("p").attr("data-size"));
	$(element).parent("div").remove();
}

var items;
var itemsLoaded = false;

$(document).ready(function(){
	function fillItemData(){
		$(".needItemData").each(function(index, val){
			$(val).removeClass("needItemData");
			var type = $(val).prev().prop('nodeName');
			if(type == "img"){
				$(val).attr("src", val.imgSrc);
			}
		});
	}

	var shoppingCartDiv = $("#cartView");
	items = getItems(function(){itemsLoaded=true;});
	
	var cartJSON = getCookie("cart");
	if(cartJSON !== null && cartJSON !== undefined && cartJSON !== ""){
		var cart = JSON.parse(cartJSON);
		$(cart).each(function(i, cartItem){
			var div = $("<div>", {"id":cartItem.id, "class": "shoppingCartItem"});
			var img = $("<img>", {"class": "needItemData"});
			var p = $("<p>", {"data-size": cartItem.size}).html("id: " + cartItem.id + ", size: " + cartItem.size + ", amount: " + cartItem.amount);
			var button = $("<button>", {"onclick": "removeElement(this)"}).html("remove");
			div.append(img);
			div.append(p);
			div.append(button);
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