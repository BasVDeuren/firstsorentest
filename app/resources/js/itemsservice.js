var getItems = function(callback){
	return $.getJSON( "../resources/json/webshop.json", function( data ) {
		if(callback !== undefined && callback !== null){
			callback(data);
		}
		return data;
	}).fail(function() {
		console.log( "An error occurred during fetching webshop data, please try again later." );
		//ToDo, popup a screen to contact Sören.
	});
};

var getItemById = function(items, id){
	var foundItem;
	$(items).each(function(index, val){
		if(val.id == id){
			foundItem = val;
			return;
		}
	});
	return foundItem;
}

var getPriceForSize = function(item, size){
	var price;
	
	$(item.pricePerSize).each(function(k, priceAndSize){
		if(
			(
			priceAndSize.sizes.split("-").length == 2 && 
			priceAndSize.sizes.split("-")[0] <= size && 
			priceAndSize.sizes.split("-")[1] >= size
			) ||
			(
			priceAndSize.sizes.split("-").length == 1 && 
			priceAndSize.sizes.split("-")[0] == size
			)
		){
			price = priceAndSize.price;
			return;
		}
	});

	return price;
}