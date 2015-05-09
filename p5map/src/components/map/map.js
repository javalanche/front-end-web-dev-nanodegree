define(['knockout', 'text!./map.html'], function(ko, templateMarkup) {

	function Map(params) {
		this.message = ko.observable('Hello from the map component!');
		//initialize();
		google.maps.event.addDomListener(window, 'load', initialize());
	}

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	Map.prototype.dispose = function() { };
	function initialize() {
		var mapOptions = {
			center: { lat: -34.397, lng: 150.644},
			zoom: 8
		};
		console.log("hey");
		console.log(mapOptions);
		var map = new google.maps.Map(document.getElementById('test'), mapOptions);
		//var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		console.log(map);
	}
	console.log("Ross");
	//initialize();
	console.log("Newman");

	return { viewModel: Map, template: templateMarkup };

});
