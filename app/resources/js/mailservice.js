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
		var deliveryP = $("<p>");
		var total = 0;
		$(accurateOrders).each(function(i, order){
			var li = $("<li>", {id: order.id}).html("Naam: " + order.name + ", prijs: €" + order.price + ", aantal: " + order.amount);
			ul.append(li);
			total = total + (parseInt(order.amount) * parseInt(order.price));
		});
		if(getCookie("delivery") == "true"){
			total += DELIVERY_COST;
			$(deliveryP).html("Wordt geleverd, hier wordt €" + DELIVERY_COST + " voor aangerekend.");
		}
		orders.append(ul);
		orders.append(deliveryP);
		var totalP = $("<p>", {}).html("Totaal: € " + total);
		orders.append(totalP);
		
		var address = $("<div>");
		pAddress = $("<p>").html("Adres: ");
		var ulAddress = $("<ul>");
		var liStreetValue = $("<li>").html("Straat: " + $("#street").val() + " " + $("#number").val() + " " + $("#bus").val());
		var liCityValue = $("<li>").html("Stad/Gemeente: " + $("#postalCode").val() + " " + $("#city").val());
		
		ulAddress.append(liStreetValue);
		ulAddress.append(liCityValue);
		address.append(pAddress);
		address.append(ulAddress);
		
		var extraAddress = $("<div>");
		if(getCookie("delivery") == "true") {
			if($("#deliveryDifferentAddress").is(":checked")){
				var deliveryInfo = $("<p>").html("Uw bestelling wordt geleverd op onderstaand adres.");
				pExtraAddress = $("<p>").html("Leveradres: ");
				var ulExtraAddress = $("<ul>");
				var liExtraStreetValue = $("<li>").html("Straat: " + $("#extraStreet").val() + " " + $("#extraNumber").val() + " " + $("#extraBus").val());
				var liExtraCityValue = $("<li>").html("Stad/Gemeente: " + $("#extraPostalCode").val() + " " + $("#extraCity").val());
				
				ulExtraAddress.append(liExtraStreetValue);
				ulExtraAddress.append(liExtraCityValue);
				extraAddress.append(deliveryInfo);
				extraAddress.append(pExtraAddress);
				extraAddress.append(ulExtraAddress);
			} else {
				var deliveryInfo = $("<p>").html("Uw bestelling wordt geleverd op bovenstaand adres.");
				extraAddress.append(deliveryInfo);
			}
		}
		
		emailjs.send("gmail_ippondeals","ippondeals_order_template",{
		  "to_email": $("#emailAddress").val(),
		  "to_name": $("#lastName").val() + " " + $("#firstName").val(),
		  "order": orders.html(),
		  "address": address.html(),
		  "extraAddress": extraAddress.html(),
		  "extrainfo": $("#extraInfo").val(),
		  "total": total
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