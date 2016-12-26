var Player = require('../top_trumps/player');
var Deck = require('../top_trumps/deck.js');
var Game = require('../top_trumps/game.js');
var MapView = require('./map_view.js');

var StartView = function() {
  this.player1 = null;
  this.player2 = null;
  this.handSize = null;
};

StartView.prototype = {
  makePlayers: function() {

    //music starts playing after 5 seconds to allow capcom theme
    setTimeout(function() {
      var themeMusic = document.getElementById('music');
      themeMusic.src = "/audio/title.mp3";
    }, 5000)

    var startPlayButton = document.getElementById('start_play');

    startPlayButton.onclick = function() {
      var p1 = document.getElementById('player1');
      var p2 = document.getElementById('player2');
      var cardNumber = document.getElementById('cardNumber');
      var errorDiv =document.getElementById('warning');
      if (!p1.value || !p2.value) {
        errorDiv.innerText = "Please enter names for players to start play";
        return;
      }else if (cardNumber.value < 1 || cardNumber.value >5){
        errorDiv.innerText = "Please enter a number from 1 to 5";
        return;
      }
      var themeMusic = document.getElementById('music');
      themeMusic.src = "/audio/fight_button.mp3";
      themeMusic.loop = false;
      this.player1 = new Player(p1.value);
      this.player2 = new Player(p2.value);
      this.handSize = cardNumber.value;
      console.log("p1", this.player1);
      console.log("p2", this.player2);
      this.getFighters();
    }.bind(this);
  },

  getFighters: function() {
    var url = "http://localhost:3000/fighters";
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function(event) {
      if (event.target.status !== 200) return;

      var jsonString = event.target.responseText;
      var data = JSON.parse(jsonString);
      this.createNewGame(data);
    }.bind(this);
    request.send();
  },
  createNewGame: function(data) {
    var deck = new Deck(data.fighters);
    var game = new Game(deck, this.handSize);
    game.addPlayer(this.player1);
    game.addPlayer(this.player2);
    this.getVenues(game);
  },
  getVenues: function(game) {
    var url = "http://localhost:3000/venues";
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function(event) {
      if (event.target.status !== 200) return;

      var jsonString = event.target.responseText;
      var data = JSON.parse(jsonString);
      var mapView = new MapView(data, game);
      mapView.create();
    }.bind(this);
    request.send();
  }
};

module.exports = StartView;
