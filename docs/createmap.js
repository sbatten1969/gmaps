function createMapObject(createMapOptions) {
    var createMapOptions = createMapOptions || { };
    createMapOptions.startLatitude = createMapOptions.startLatitude || 40.72; // NYC
    createMapOptions.startLongitude = createMapOptions.startLongitude || -73.95; // NYC
    createMapOptions.zoomLevel = createMapOptions.zoomLevel || 10;

    var stylesDeeplyFaded = 
      [
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "lightness": 60 }
          ]
        },{
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            { "lightness": 70 }
          ]
        },{
          "featureType": "poi.business",
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "water",
          "stylers": [
            { "lightness": 30 }
          ]
        },{
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#E0E0E0" }  // Faint grey instead of default white
          ]
        },{
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -25 }
          ]
        },{
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#FFEEAA" }  // Moderate yellow instead of deep yellow or orange
          ]
        },{
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.1 }
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -15 }
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.25 }
          ]
        },{
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -15 }
          ]
        },{
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.75 }
          ]
        }
      ];

    var fadedMap = new google.maps.StyledMapType(stylesDeeplyFaded, {name: "Faded Map"});

    var stylesHighContrast = 
      [
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "color": "#FFFFF0" }  // Very light yellow
          ]
        },{
          "featureType": "poi",  // turn off points of interest like attractions, government buildings, etc.
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "poi.park",
          "stylers": [
            { "visibility": "on" }  // BUT do show parks
          ]
        },{
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            { "lightness": 60 }
          ]
        },{
          "featureType": "water",
          "stylers": [
            { "lightness": -10 }  // Set darker for higher contrast for visibility of streams/rivers
          ]
        },{
          "featureType": "administrative",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 1.5 }  // Fade the administrative labels like town names so they don't contrast as much
          ]
        },{
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 1.5 }  // Fade the park labels so they don't contrast as much
          ]
        },{
          "featureType": "transit",
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#E0E0E0" }  // Faint grey instead of default white
          ]
        },{
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -60 }  // Darker to look like a heavier line
          ]
        },{
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#FFEEAA" }  // Moderate yellow instead of deep yellow or orange
          ]
        },{
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.01 }
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -50 }  // Darker to look like a heavier line
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.15 }
          ]
        },{
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            { "lightness": -40 }  // Darker to look like a heavier line
          ]
        },{
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
            { "gamma": 0.25 }
          ]
        }
      ];

    var highContrastMap = new google.maps.StyledMapType(stylesHighContrast, {name: "High Contrast"});

    var mapOptions = {
        zoom: createMapOptions.zoomLevel,
        center: new google.maps.LatLng(createMapOptions.startLatitude, createMapOptions.startLongitude),
        panControl: false,
        zoomControl: true,
        streetViewControl:true,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControlOptions: {
          style:google.maps.ZoomControlStyle.SMALL,
          position:google.maps.ControlPosition.RIGHT_TOP  // goes in top-right corner, but just below anything labeled "top_right"
        },
        scaleControl:true,
        mapTypeControl:true,
        mapTypeControlOptions: {
          style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,  
          mapTypeIds: [
              google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, 
              'faded_map_style', 'OSM', 'highcontrast_map_style' ],
          position:google.maps.ControlPosition.TOP_RIGHT
        },
        mapTypeId: 'faded_map_style' // google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);

    map.mapTypes.set('faded_map_style', fadedMap);
    map.mapTypes.set('highcontrast_map_style', highContrastMap);

    // Define OSM map type pointing at the OpenStreetMap tile server
    // Source for this code snippet: http://wiki.openstreetmap.org/wiki/Google_Maps_Example

    map.mapTypes.set('OSM', new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));


    return map;
}
