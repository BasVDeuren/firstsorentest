var addToCart = function(id, size, amount){
	var cartJSON = sessionStorage.getItem( "cart" );
	var cart;
	if(cartJSON === undefined || cartJSON === null){
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
	sessionStorage.setItem( "cart", jsonCart );
}

var removeFromCart = function(id, size){
	var cartJSON = sessionStorage.getItem( "cart");
	if(cartJSON !== null && cartJSON !== undefined){
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
		sessionStorage.setItem( "cart", jsonCart);
	}
}

var removeElement = function(element){
	var id = $(element).parent("div").find("p").attr("id");
	removeFromCart(id, $(element).parent("div").find("p").attr("data-size"));
	$(element).parent("div").remove();
}

$(document).ready(function(){
	var shoppingCartDiv = $("#cartView");
	
	var cartJSON = sessionStorage.getItem("cart");
	if(cartJSON !== null && cartJSON !== undefined){
		var cart = JSON.parse(cartJSON);
		$(cart).each(function(i, item){
			var div = $("<div>");
			var p = $("<p>", {"id":item.id, "data-size": item.size}).html("id: " + item.id + ", size: " + item.size + ", amount: " + item.amount);
			var button = $("<button>", {"onclick": "removeElement(this)"}).html("remove");
			div.append(p);
			div.append(button);
			shoppingCartDiv.append(div);
		});
	}
});