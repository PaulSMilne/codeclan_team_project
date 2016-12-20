var GameView = require('./game_view.js');

var MapView = function(data, game) {
  this.data = data;
  this.game = game;
  this.map = null;
  this.countryMarkers = [];
  this.venueMarkers = []; 
}

MapView.prototype = {
  create: function() {
    var splash = document.getElementById('splash');
    splash.style.display = "none";
    var gameView = document.getElementById('game');
    gameView.style.display = "none";
    var mapView = document.getElementById('map-view');
    mapView.style.display = "block";
    var container = document.getElementById('map-container');
    this.map = new google.maps.Map(container, { 
      center: {lat: 40, lng: 20}, 
      zoom: 2,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#33cc33"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#3366ff"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
    })
    this.addLogo();
    this.addMarkers();
  },
  addLogo: function() {
    var logoContainer = document.createElement('div');
    var logo = document.createElement('img');
    logo.src = "/images/logo-sf.png";
    logo.style.width = "300px";
    logoContainer.appendChild(logo);
    logoContainer.onclick = function() {
      this.map.setCenter({lat: 40, lng: 20});
      this.map.setZoom(2);
      for (venue of this.venueMarkers) {
        venue.setMap(null);
      }
      this.addMarkers();
    }.bind(this);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(logoContainer);
  },

  addMarkers: function() {
    var countries = this.data.countries;
    for(country of countries) {
      var marker = new google.maps.Marker({
        position: country.countryCoords,
        map: this.map,
        icon: {
          url: "/images/country_flags/" + country.flag,
          scaledSize: new google.maps.Size(50, 30)
        }
      })
      marker.country = country;
      this.countryMarkers.push(marker);
      this.addMarkerListener(marker, country.countryCoords);
    }
  },
  addMarkerListener: function(marker, countryCoords) {
    marker.addListener('click', function() {
      this.map.setCenter(countryCoords)
      this.map.setZoom(5);
      for (var flag of this.countryMarkers) {
        flag.setMap(null);
      }
      var venues = marker.country.venues
      for(venue of venues) {
        var venueMarker = new google.maps.Marker({
          position: venue.coords,
          map: this.map,
          icon: {
            url: "/images/fist_icon.ico",
            scaledSize: new google.maps.Size(50, 50)
          }
        })
        this.venueMarkers.push(venueMarker);
        this.addVenueClickListener(venueMarker, venue);
        this.addVenueMouseOverListener(venueMarker, venue);
      }
    }.bind(this))
  },
  addVenueClickListener: function(venueMarker, venue) {
    venueMarker.addListener('click', function() {
      var gameView = new GameView(this.game, venue)
      gameView.display()
    }.bind(this))
  },
  addVenueMouseOverListener: function(venueMarker, venue) {
    venueMarker.addListener('mouseover', function() {
      var infoWindow = new google.maps.InfoWindow({
        content: "Test"
      })
      infoWindow.open(this.map, venueMarker);
      this.addVenueMouseOutListener(infoWindow, venueMarker);
    }.bind(this))
  },
  addVenueMouseOutListener: function(infoWindow, venueMarker) {
    venueMarker.addListener('mouseout', function() {
      infoWindow.close()
    }.bind(this))
  }

};


module.exports = MapView;