$(document).ready(function(){
	$("#addressDiv").hide();

	$("#delivery").change(function(){
		if($("#addressDiv").is(":visible")){
			$("#addressDiv").hide();
		} else {
			$("#addressDiv").show();
		}
	});
});