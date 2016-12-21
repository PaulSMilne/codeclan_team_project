var GameView = require('./game_view.js');
var getStyles = require('./map_styles.js');

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
      styles: getStyles()
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
    logoContainer.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(logoContainer);
    var venueContainer = document.createElement('div');
    venueContainer.id = "venue-container";
    venueContainer.index = 2;
    venueContainer.style.display = "none";
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(venueContainer);
    
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
      var venueContainer = document.getElementById('venue-container');
      venueContainer.style.display = "initial"
      var venueName = document.createElement('h2');
      var image = document.createElement('img');
      venueContainer.appendChild(venueName);
      venueContainer.appendChild(image);
      venueName.innerText = "Stage: " + venue.name;
      image.src = "/images/venues/"+venue.image;
      var themeMusic = document.getElementById('music');
      themeMusic.src = "/audio/" + venue.themeMusic;
      this.addVenueMouseOutListener(venueMarker, venueContainer);
    }.bind(this))
  },
  addVenueMouseOutListener: function(venueMarker, venueContainer) {
    var mouseOutHandle = venueMarker.addListener('mouseout', function() {
      venueContainer.innerHTML = "";
      venueContainer.style.display = "none";
      var themeMusic = document.getElementById('music');
      themeMusic.src = "";
    }.bind(this))
  }

};


module.exports = MapView;