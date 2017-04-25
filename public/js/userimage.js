// Removebuttonia painettaessa lähettää tiedostonimen palvelimelle poistoa varten
$("#removebutton").click(function(){

	var rmimg = $("img:only-of-type").attr('src');
	$("#file").val(rmimg);

	$('#deleterequest').submit(function() {
		return true;
	});

});
