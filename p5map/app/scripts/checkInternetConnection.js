var checkInternetConnection = function(){
	$.ajax({
		url: 'http://echo.jsontest.com/key/value/one/two', 
		type: "POST", 
		dataType: 'jsonp', 
		success: function(){
			console.log("success");
			$('#message-404').slideUp('fast');
		}, 
		error: function(){
			console.log("error");
			$('#message-404').slideDown('fast');
		}
	})
};
$(function () {
	$('#message-404').slideUp('fast');
	setInterval(checkInternetConnection, 5000);
});