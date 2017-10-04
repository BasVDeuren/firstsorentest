$(document).ready(function(){
	$("#deliveryDifferentAddress").closest(".checkbox").hide();
	$("#extraAddressDiv").hide();

	$("#delivery").change(function(){
		if($("#deliveryDifferentAddress").closest(".checkbox").is(":visible")){
			$("#deliveryDifferentAddress").closest(".checkbox").hide();
		} else {
			$("#deliveryDifferentAddress").closest(".checkbox").show();
		}
		if($("#extraAddressDiv").is(":visible")){
			$("#extraAddressDiv").hide();
		}
		$("#deliveryDifferentAddress").removeAttr("checked");
	});
	
	$("#deliveryDifferentAddress").change(function(){
		if($("#extraAddressDiv").is(":visible")){
			$("#extraAddressDiv").hide();
		} else {
			$("#extraAddressDiv").show();
		}
	});
	
	
	$("#okHomeButtonModal").click(function(){
		window.location.href="index.html"
	})
});