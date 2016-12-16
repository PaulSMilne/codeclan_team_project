var Deck = require('./top_trumps/deck.js');
var Game = require('./top_trumps/game.js');
var GameView = require('./views/game_view.js'); 
var StartView = require('./views/start_view.js')

var app = function() {
  var startview = new StartView();
  startview.makePlayers();
  getFighters();
  getVenues();
};

var getFighters = function() {
  var url = "http://localhost:3000/fighters";
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function(event) {
    if (event.target.status !== 200) return;

    var jsonString = event.target.responseText;
    var data = JSON.parse(jsonString);
    createNewGame(data);
  };
  request.send();
};

var getVenues = function() {
  var url = "http://localhost:3000/venues";
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function(event) {
    if (event.target.status !== 200) return;
    var directory = "images/venues/";
    var jsonString = event.target.responseText;
    var data = JSON.parse(jsonString);
    var img = document.createElement('img');
    img.src = directory + data.countries[0].venues[0].image;
    var splash = document.getElementById('splash');
    splash.appendChild(img);
  };
  request.send();
};

var createNewGame = function(data) {
  var deck = new Deck(data);
  var game = new Game(deck, 3);
  var gameView = new GameView(game);
  gameView.display();
} 

window.onload = app;