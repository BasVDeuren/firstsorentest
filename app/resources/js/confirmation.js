$(document).ready(function(){
	$("#extraAddressDiv").hide();
	
	if(getCookie("delivery") == "false"){
		$("#deliveryDifferentAddress").hide();
	}

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