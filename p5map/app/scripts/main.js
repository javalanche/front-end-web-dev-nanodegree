var ViewModel = function (e) {
	google.maps.event.addDomListener(window, 'load', Initialize(e));
	//this.menuModel = [
		//{map: "map1"},
		//{map: "map2"},
		//{map: "map3"}
		//];
	this.currentMap = ko.observable(new Initialize());
}
var Initialize = function (e) {
	var self = this;
	console.log(e);

	//setup for map
	var mapProp = {
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
  var markers = [];
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(32.7902, 263.1759),
	  new google.maps.LatLng(32.7474, 263.2631));
  map.fitBounds(defaultBounds);

// //Knockout js implementation
// 	// Create the search box and link it to the UI element.
// 	this.input = /** @type {HTMLInputElement} */ (ko.observable("sushi"));
// 	console.log(this.input());
// 	map.controls[google.maps.ControlPosition.TOP_LEFT].push(self.input());

// 	var searchBox = new google.maps.places.SearchBox(
		// /** @type {HTMLInputElement} */(self.input()));

//From Goog Documentation vanilla js implementation
   // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}



//start everything
var test = "test";
ko.applyBindings(new ViewModel(test));
