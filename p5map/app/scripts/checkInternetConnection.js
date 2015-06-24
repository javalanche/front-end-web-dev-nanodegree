var checkInternetConnection = function(){
$.ajaxSetup({ 
	dataType: "jsonp",
	cache: false
});
$.getJSON( "https://raw.githubusercontent.com/javalanche/angularjs/master/angular-phonecat/bower.json", function() {
	console.log("success");
	$('#message-404').slideUp('fast');
})
  .fail(function() {
    console.log( "error" );
	$('#message-404').slideDown('fast');
  });
};
$(function () {
	$('#message-404').slideUp('fast');
	setInterval(checkInternetConnection, 5000);
});