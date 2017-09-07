var getItems = function(callback){
	return $.getJSON( "../resources/json/webshop.json", function( data ) {
		callback();
		return data;
	}).fail(function() {
		console.log( "An error occurred during fetching webshop data, please try again later." );
		//ToDo, popup a screen to contact Sören.
	});
};