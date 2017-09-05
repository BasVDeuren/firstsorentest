var categories = [];

function setChosenProductToCookie(e){
	setCookie("chosenProduct",$(e.currentTarget).closest("div.webshopProduct").attr("id"),10);
	window.location.href = './detail.html';
	e.preventDefault();
}
function changeCategory(elem, category) {
	$("#categories a").each(function(index, val){
		$(val).removeClass("btn-primary");
		$(val).addClass("btn-default");
	});
	$(elem).addClass("btn-primary");
	$(elem).removeClass("btn-default");
	$("#shopForm .webshopProduct").each(function(index, val){
		if($(val).attr("class").indexOf(category) < 0){
			$(val).addClass("hidden");
		} else {
			$(val).removeClass("hidden");
		}
	});
}
function elementsEqualHeight(elements){
	var heighestHeight = 0;
	$(elements).each(function(index, element){
		if($(element).height() > heighestHeight){
			heighestHeight = $(element).height();
		}
	});
	$(elements).each(function(index, element){
		$(element).height(heighestHeight);
	});
}

$(document).ready(function(){
	function createProduct(index, val){
		if(categories.indexOf(val.category) < 0){
			categories.push(val.category);
		}
		var product = $("<div>", {id:val.id, "class":val.category + " webshopProduct"});
		var imgDiv = $("<div>", {"class": "img"});
		var link = $("<a>", {href: "#", onclick:"return setChosenProductToCookie(event)"})
		var image = $("<img>", {"alt":"test", "src":"../resources/img/" + val.imgSrc, "class":"productImg"});
		var contentDiv = $("<div>", {"class":"content"});
		var name = $("<p>").html(val.name);
		var price = $("<p>").html("Vanaf: €" + val.pricePerSize[0].price);
		link.append(image);
		imgDiv.append(link);
		contentDiv.append(name);
		contentDiv.append(price);
		product.append(imgDiv);
		product.append(contentDiv);
		
		return product;
	}

	$.getJSON( "../resources/json/webshop.json", function( data ) {
	  var row;
	  $.each( data, function( index, val ) {
		var iteration = index + 1;
		$("#shopForm").append(createProduct(index, val));
	  });
	  $.each(categories, function( index, val) {
		var a = $("<a>", {"href": "#", "class":"btn btn-default", "onclick": "changeCategory(this, '"+val+"')"}).html(val);
		$("#categories").append(a);
		$("#categories a")[0].click();
	  });
	}).fail(function() {
		console.log("An error occurred during fetching webshop data, please try again later.");
		//ToDo, popup a screen to contact Sören.
	});
	
	$(window).on("load", function(){
		elementsEqualHeight($(".webshopProduct"));
	})
});