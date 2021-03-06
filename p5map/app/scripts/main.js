// 'use strict';
var map;
var currentMarkerPosition; // set static position for Yelp box
var currentSelectedItem; // info for Yelp box
var count = 0; // debugging var
var YWSID = 'tuoehBb1CHssBRwmS1Wt1Q'; // common required parameter (api key)
var markers = []; // google maps api markers array for search results


/*
 * Construct the URL to call for the API request
 */
function constructYelpURL(input) {

	var mapBounds = map.getBounds();
	var URL = 'http://api.yelp.com/' +
	'business_review_search?'+
		'callback=' + 'handleResults' +
		'&term=' + input + 
		'&num_biz_requested=10' +
		'&tl_lat=' + mapBounds.getSouthWest().lat() +
		'&tl_long=' + mapBounds.getSouthWest().lng() +
		'&br_lat=' + mapBounds.getNorthEast().lat() + 
		'&br_long=' + mapBounds.getNorthEast().lng() +      
		'&ywsid=' + YWSID;
	return encodeURI(URL);
}

/*
 * Formats the categories HTML
 */
function formatCategories(cats) {
	var s = 'Categories: ';
	for(var i=0; i<cats.length; i++) {
		s+= cats[i].name;
		if(i !== cats.length-1) {
			s += ', ';
		}
	}
	s += '<br/>';
	return s;
}

/*
 * Formats the neighborhoods HTML
 */
function formatNeighborhoods(neighborhoods) {
	var s = 'Neighborhoods: ';
	for(var i=0; i<neighborhoods.length; i++) {
		s += '<a href="' + neighborhoods[i].url + '" target="_blank">' + neighborhoods[i].name + '</a>';
		if (i !== neighborhoods.length-1) {
			s += ', ';
		}
	}
	s += '<br/>';
	return s;
}

/*
 * Formats the phone number HTML
 */
function formatPhoneNumber(num) {
	if(num.length !== 10) {
		return '';
	}
	return '(' + num.slice(0,3) + ') ' + num.slice(3,6) + '-' + num.slice(6,10) + '<br/>';
}


/*
 * Formats and returns the Info Window HTML 
 * (displayed in a balloon when a marker is clicked)
 */
function generateInfoWindowHtml(biz) {
	var text = '<div class="marker">';

	// image and rating
	text += '<img class="businessimage" src="'+biz.photo_url+'"/>';

	// div start
	text += '<div class="businessinfo">';
	// name/url
	text += '<a href="'+biz.url+'" target="_blank">'+biz.name+'</a><br/>';
	// stars
	text += '<img class="ratingsimage" src="'+biz.rating_img_url_small+'"/>&nbsp;based&nbsp;on&nbsp;';
	// reviews
	text += biz.review_count + '&nbsp;reviews<br/><br />';
	// categories
	text += formatCategories(biz.categories);
	// neighborhoods
	if(biz.neighborhoods.length)
		{text += formatNeighborhoods(biz.neighborhoods);}
	// address
	text += biz.address1 + '<br/>';
	// address2
	if(biz.address2.length) 
		{text += biz.address2+ '<br/>';}
	// city, state and zip
	text += biz.city + ',&nbsp;' + biz.state + '&nbsp;' + biz.zip + '<br/>';
	// phone number
	if(biz.phone.length)
		{text += formatPhoneNumber(biz.phone);}
	// Read the reviews
	text += '<br/><a href="'+biz.url+'" target="_blank">Read the reviews »</a><br/>';
	// div end
	text += '</div></div>';

	return text;
}

/*
 * Creates a marker for the given business and point
 */
function createMarker(biz, point, markerNum) {

	var infoWindowHtml = generateInfoWindowHtml(biz);

	// automatically open first markerNew
	if (markerNum === 0){
		var yelpBox = document.getElementById('yelp-box');
		yelpBox.innerHTML = infoWindowHtml;
		yelpBox.style.display = 'block';

	}
}

/*
 * If a sucessful API response is received, place
 * markers on the map.  If not, display an error.
 */
function handleResults(data) {

	if(data.message.text === 'OK') {
		if (data.businesses.length === 0) {
			alert('Yelp Error: No businesses were found in Yelp near that location');
			return;
		}
		for(var i=0; i<data.businesses.length; i++) {
			var biz = data.businesses[i];
			createMarker(biz, new google.maps.LatLng(currentMarkerPosition.A, currentMarkerPosition.F), i);
		}
	}
	else {
		alert('Yelp error: ' + data.message.text);
	}
}

/*
 * Called on the form submission: updates the map by
 * placing markers on it at the appropriate places
 */
function updateMap(e) {

	var yelpRequestURL = constructYelpURL(e);


	/* do the api request */
	var script = document.createElement('script');
	script.src = yelpRequestURL;
	script.type = 'text/javascript';
	var head = document.getElementsByTagName('head').item(0);
	head.appendChild(script);
	return false;
}

/*
 * main initialization called from ViewModel below
 * also hold the search and event listeners for google maps api
 */
var Initialize = function () {

	var placesList = document.getElementById('places');
	var resultsId = document.getElementById('results');
	var yelpBox = document.getElementById('yelp-box');

	//setup for map
	var mapProp = {
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById('googleMap'), mapProp);
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(32.7902, 263.1759),
		new google.maps.LatLng(32.7474, 263.2631));
	map.fitBounds(defaultBounds);

	//From Goog Documentation vanilla js implementation
	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
		/** @type {HTMLInputElement} */(input));

	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		count++;

		var places = searchBox.getPlaces();

		// removes previous list items
		while ( placesList.firstChild ) {
			placesList.removeChild( placesList.firstChild );
		}
		resultsId.style.display = 'none';
		yelpBox.style.display = 'none';

		if (places.length === 0) {
			return;
		}

		// removes previous markers
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

			var infowindow = new google.maps.InfoWindow();
			var x = place.name;
			var y = place.geometry.location;

			google.maps.event.addListener(marker, 'click', (function(nameCopy, positionCopy) {
				return function(){
					// count++;
					currentMarkerPosition = positionCopy;
					yelpBox.style.display = 'none';
					document.getElementById('yelp-box').innerHTML = '';
					updateMap(nameCopy);

					currentSelectedItem = nameCopy;

					if (infowindow) {
						infowindow.close();
					}
					infowindow.setContent('<a>'+nameCopy+'</a>');
					infowindow.open(map, this);
					cssHack(nameCopy);
				};
			})(x, y));

			// places items in list view
			if (places.length > 1) {
				placesList.innerHTML += '<li><a>' + place.name + '</a></li>';
				resultsId.style.display = 'block';
			}

		}

		// need because google maps api infowindow has slightly missed placed
		function cssHack(nameCopy) {
			$('a:contains(' + nameCopy + ')').closest('div[style="transform: translateZ(0px); position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;"').css({'left': '-23px'});
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
};

var ViewModel = function () {
	// calls the Initialize function to kick everything off
	google.maps.event.addDomListener(window, 'load', new Initialize());

	// observable for search input
	this.input = (ko.observable('Enter your city or address'));
};

//start everything
ko.applyBindings(new ViewModel());
