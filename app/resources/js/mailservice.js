(function(){
  emailjs.init("user_hzh4Mg9Kjah16You00NXI");
})();

$(document).ready(function(){
	$("#sendMailButton").click(function(e){
	var toEmail = $("#email").val();
	var toName = $("#name").val();
	var pricePerFrak = $("#pricePerFrak").val();
	var numberOfJudoFrakken = $("#numberOfJudoFrakken").val();
	var total = pricePerFrak * numberOfJudoFrakken;
	
		emailjs.send("gmail","ippondeals_order_template",{
		  "to_email": toEmail,
		  "to_name": toName,
		  "number_of_judo_frakken": numberOfJudoFrakken, 
		  "price_per_frak": pricePerFrak,
		  "total": total
		})
		.then(
		  function(response) {
			console.log("SUCCESS", response);
		  }, 
		  function(error) {
			console.log("FAILED", error);
		  }
		);
	});
});