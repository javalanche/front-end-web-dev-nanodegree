"use strict";
var map;
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
	var YWSID = "tuoehBb1CHssBRwmS1Wt1Q"; // common required parameter (api key)
	var icon = null;

	var placesList = document.getElementById('places');
	var resultsId = document.getElementById('results');

	//setup for map
	var mapProp = {
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var markers = [];
	map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(32.7902, 263.1759),
		new google.maps.LatLng(32.7474, 263.2631));
		map.fitBounds(defaultBounds);

		// //Knockout js implementation
		//  var input = /** @type {HTMLInputElement} */ (ko.observable("sushi"));
		//    console.log("input: ", input);
		//  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input());
		//    console.log("second one: ", map.controls[google.maps.ControlPosition.TOP_LEFT].push(input));
		//  var searchBox = new google.maps.places.SearchBox(
		//     /** @type {HTMLInputElement} */(input()));
		// console.log("searchBox: ", searchBox);

		//  // Create the search box and link it to the UI element.
		//  this.input = /** @type {HTMLInputElement} */ (ko.observable("sushi"));
		//  console.log(this.input());
		//  map.controls[google.maps.ControlPosition.TOP_LEFT].push(self.input());
		//  var searchBox = new google.maps.places.SearchBox(
		// /** @type {HTMLInputElement} */(self.input()));

		//From Goog Documentation vanilla js implementation
		// Create the search box and link it to the UI element.
		var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
		console.log("input: ", input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		console.log("second one: ", map.controls[google.maps.ControlPosition.TOP_LEFT].push(input));
		var searchBox = new google.maps.places.SearchBox(
			/** @type {HTMLInputElement} */(input));
			console.log("searchBox: ", searchBox);

			// Listen for the event fired when the user selects an item from the
			// pick list. Retrieve the matching places for that item.
			google.maps.event.addListener(searchBox, 'places_changed', function() {
				var places = searchBox.getPlaces();

				while ( placesList.firstChild ) {
					placesList.removeChild( placesList.firstChild );
					resultsId.style.display = "none";
				}

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

					var infowindow = new google.maps.InfoWindow();
					var x = place.name;
					//var y = place.geometry.location;
					//console.log(y);
					//console.log(marker);
					google.maps.event.addListener(marker, 'click', (function(nameCopy) {
						return function(){
							infowindow.setContent("<a>"+nameCopy+"</a>");
							//console.log(this);
							infowindow.open(map, this);
							cssHack(nameCopy);
							updateMap();
						};
					})(x));

					if (places.length > 1) {
						placesList.innerHTML += '<li><a>' + place.name + '</a></li>';
						resultsId.style.display = "block";
					}

				}
				function cssHack(nameCopy) {
					//console.log(nameCopy);
					//$("a:contains(" + nameCopy + ")").attr("style","color: red");
					$("a:contains(" + nameCopy + ")").closest('div[style="transform: translateZ(0px); position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;"').css({"left": "-23px"});
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
var YWSID = "tuoehBb1CHssBRwmS1Wt1Q"; // common required parameter (api key)

var map = null;
var icon = null;

/*
 * Creates the map object and calls setCenterAndBounds
 * to instantiate it.
 */
 function load() {
   //map = new GMap2(document.getElementById("map"));
  console.log("SECOND: ", map);
   GEvent.addListener(map, "load", function() {updateMap();});    
   //map.setCenter(new GLatLng(37.7916,-122.4418),13);
   //map.addControl(new GLargeMapControl());
   //map.addControl(new GMapTypeControl());
   //map.setMapType(G_HYBRID_MAP);

   if (window.attachEvent) window.attachEvent("onresize", function() { map.checkResize()} );
   else if (window.addEventListener) window.addEventListener("resize", function() { map.checkResize()}, false);

   // setup our marker icon
   //icon = new GIcon();
   //icon.image = "images/marker_star.png";
   //icon.shadow = "images/marker_shadow.png";
   //icon.iconSize = new GSize(20, 29);
   //icon.shadowSize = new GSize(38, 29);
   //icon.iconAnchor = new GPoint(15, 29);
   //icon.infoWindowAnchor = new GPoint(15, 3);
 }

 /*
  * Construct the URL to call for the API request
  */
  function constructYelpURL() {
  console.log("SECOND: ", map);
    var mapBounds = map.getBounds();
    var URL = "http://api.yelp.com/" +
      "business_review_search?"+
      "callback=" + "handleResults" +
      "&term=" + document.getElementById("term").value + 
      "&num_biz_requested=10" +
      "&tl_lat=" + mapBounds.getSouthWest().lat() +
      "&tl_long=" + mapBounds.getSouthWest().lng() + 
      "&br_lat=" + mapBounds.getNorthEast().lat() + 
      "&br_long=" + mapBounds.getNorthEast().lng() +
      "&ywsid=" + YWSID;
    return encodeURI(URL);
  }

  /*
   * Called on the form submission: updates the map by
   * placing markers on it at the appropriate places
   */
   function updateMap() {
     // turn on spinner animation
     //document.getElementById("spinner").style.visibility = 'visible';

     var yelpRequestURL = constructYelpURL();

     /* clear existing markers */
     // map.clearOverlays();
     while(overlays[0])
{
  overlays.pop().setMap(null);
}

     /* do the api request */
     var script = document.createElement('script');
     script.src = yelpRequestURL;
     script.type = 'text/javascript';
     var head = document.getElementsByTagName('head').item(0);
     head.appendChild(script);
     return false;
   }

   /*
  * If a sucessful API response is received, place
  * markers on the map.  If not, display an error.
  */
  function handleResults(data) {
    // turn off spinner animation
    //document.getElementById("spinner").style.visibility = 'hidden';
    if(data.message.text == "OK") {
      if (data.businesses.length == 0) {
        alert("Error: No businesses were found near that location");
        return;
      }
      for(var i=0; i<data.businesses.length; i++) {
        var biz = data.businesses[i];
        createMarker(biz, new google.maps.LatLng(biz.latitude, biz.longitude), i);
      }
    }
    else {
      alert("Error: " + data.message.text);
    }
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
       text += formatNeighborhoods(biz.neighborhoods);
     // address
     text += biz.address1 + '<br/>';
     // address2
     if(biz.address2.length) 
       text += biz.address2+ '<br/>';
     // city, state and zip
     text += biz.city + ',&nbsp;' + biz.state + '&nbsp;' + biz.zip + '<br/>';
     // phone number
     if(biz.phone.length)
       text += formatPhoneNumber(biz.phone);
     // Read the reviews
     text += '<br/><a href="'+biz.url+'" target="_blank">Read the reviews »</a><br/>';
     // div end
     text += '</div></div>'
     return text;
   }

   /*
    * Formats the categories HTML
    */
    function formatCategories(cats) {
      var s = 'Categories: ';
      for(var i=0; i<cats.length; i++) {
        s+= cats[i].name;
        if(i != cats.length-1) s += ', ';
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
         if (i != neighborhoods.length-1) s += ', ';
       }
       s += '<br/>';
       return s;
     }

     /*
    * Formats the phone number HTML
    */
    function formatPhoneNumber(num) {
      if(num.length != 10) return '';
      return '(' + num.slice(0,3) + ') ' + num.slice(3,6) + '-' + num.slice(6,10) + '<br/>';
    }

    /*
     * Creates a marker for the given business and point
     */
var overlays = [];
     function createMarker(biz, point, markerNum) {
       var self = this;
       var infoWindowHtml = generateInfoWindowHtml(biz)
       var markerNew = new google.maps.Marker(point, null);
       var infoStr = 'hello';
       var infowindow =
         new google.maps.InfoWindow({

                 content: infoWindowHtml

         });
         overlays.push(markerNew);

       console.log(markerNew);
       markerNew.setMap(map);
       //map.addOverlay(markerNew);
       google.maps.event.addListener(markerNew, "click", function() {
         markerNew.InfoWindowHtml(infoWindowHtml, {maxWidth:400});
       });
       // automatically open first markerNew
       if (markerNum == 0){
         console.log("markerNew: ", markerNew);
         console.log("infoWindowHtml: ", infoWindowHtml);
         infowindow.open(map, markerNew);
         //markerNew.InfoWindowHtml(infoWindowHtml, {maxWidth:400});
       }
     }


//start everything
var test = "test";
ko.applyBindings(new ViewModel());
