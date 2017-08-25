var data;
var cart;
(function(){
  emailjs.init("user_hzh4Mg9Kjah16You00NXI");
})();

$(document).ready(function(){
	data = getItems();
	var cartJSON = getCookie("cart");
	if(cartJSON !== null && cartJSON !== undefined && cartJSON !== ""){
		cart = JSON.parse(cartJSON);
	}
	$("#sendMailButton").unbind('click').click(function(e){
		e.preventDefault();
		var accurateOrders = getAccurateOrders();
		var orders = $("<div>");
		var ul = $("<ul>");
		var total = 0;
		$(accurateOrders).each(function(i, order){
			var li = $("<li>", {id: order.id}).html("Naam: " + order.name + ", prijs: " + order.price + ", aantal: " + order.amount);
			ul.append(li);
			total = parseInt(order.amount) * parseInt(order.price);
		});
		orders.append(ul);
		var totalP = $("<p>", {}).html("Totaal: " + total);
		orders.append(totalP);
		
		emailjs.send("gmail","ippondeals_order_template",{
		  "to_email": $("#emailAddress").val(),
		  "to_name": $("#lastName").val() + $("#firstName").val(),
		  //"number_of_judo_frakken": $("#numberOfJudoFrakken").val(), 
		  //"price_per_frak": $("#pricePerFrak").val(),
		  //"total": $("#pricePerFrak").val() * $("#numberOfJudoFrakken").val()
		  "order": orders.html()
		}).then(
		  function() {
			console.log("SUCCESS");
		  }, 
		  function(error) {
			console.log("FAILED", error);
		  }
		);
	});
});

var getAccurateOrders = function(){
	var orders = [];
	$(data.responseJSON).each(function(i, item){
		var found = false;
		$(cart).each(function(j, cartItem){
			if(item.id == cartItem.id){
				$(item.pricePerSize).each(function(k, priceAndSize){
					if(
						(
						priceAndSize.sizes.split("-").length == 2 && 
						priceAndSize.sizes.split("-")[0] <= cartItem.size && 
						priceAndSize.sizes.split("-")[1] >= cartItem.size
						) ||
						(
						priceAndSize.sizes.split("-").length == 1 && 
						priceAndSize.sizes.split("-")[0] == cartItem.size
						)
					){
						var found = true;
						var orderItem = {
							"id": cartItem.id,
							"price": priceAndSize.price,
							"size": cartItem.size,
							"amount": cartItem.amount,
							"name": item.name
							}
						orders.push(orderItem);
						return false;
					}
				});	
			}
			if(found){
				return false;
			}
		});
	});
	return orders;
}