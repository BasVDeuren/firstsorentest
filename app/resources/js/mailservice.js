(function(){
  emailjs.init("user_hzh4Mg9Kjah16You00NXI");
})();

$(document).ready(function(){
	$("#sendMailButton").click(function(e){
	e.preventDefault();
		emailjs.send("gmail","ippondeals_order_template",{
		  "to_email": $("#email").val(),
		  "to_name": $("#name").val(),
		  "number_of_judo_frakken": $("#numberOfJudoFrakken").val(), 
		  "price_per_frak": $("#pricePerFrak").val(),
		  "total": $("#pricePerFrak").val() * $("#numberOfJudoFrakken").val()
		})
		.then(
		  function() {
			console.log("SUCCESS");
		  }, 
		  function(error) {
			console.log("FAILED", error);
		  }
		);
	});
});