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
		$.blockUI({ message: '<h1>Uw aanvraag wordt verwerkt, even geduld.</h1>' }); 
		var accurateOrders = getAccurateOrders();
		var orders = $("<div>");
		var ul = $("<ul>");
		var total = 0;
		$(accurateOrders).each(function(i, order){
			var li = $("<li>", {id: order.id}).html("Naam: " + order.name + ", prijs: " + order.price + ", aantal: " + order.amount);
			ul.append(li);
			total = total + (parseInt(order.amount) * parseInt(order.price));
		});
		orders.append(ul);
		var totalP = $("<p>", {}).html("Totaal: " + total);
		orders.append(totalP);
		
		var address = $("<div>");
		if($("#delivery").is(":checked")){
			address = $("<div>");
			pAddress = $("<p>").html("Adres (Wordt geleverd): ");
			var ulAddress = $("<ul>");
			var liStreetValue = $("<li>").html("Straat: " + $("#street").val() + " " + $("#number").val() + " " + $("#bus").val());
			var liCityValue = $("<li>").html("Stad/Gemeente: " + $("#postalCode").val() + " " + $("#city").val());
			
			ulAddress.append(liStreetValue);
			ulAddress.append(liCityValue);
			address.append(pAddress);
			address.append(ulAddress);
		} else {
			var pAddress = $("<p>").html("Levering is niet van toepassing.");
			address.append(pAddress);
		}
		
		emailjs.send("gmail_ippondeals","ippondeals_order_template",{
		  "to_email": $("#emailAddress").val(),
		  "to_name": $("#lastName").val() + $("#firstName").val(),
		  "order": orders.html(),
		  "address": address.html(),
		  "extrainfo": $("#extraInfo").val()
		}).then(
		  function() {
			$.unblockUI();
			$('#confirmationModal').modal('show');
			clearCart();
		  }, 
		  function(error) {
			console.log("FAILED", error);
			$.unblockUI();
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