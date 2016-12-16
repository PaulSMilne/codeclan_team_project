var Deck = require('./top_trumps/deck.js');
var Game = require('./top_trumps/game.js');
var GameView = require('./views/game_view.js'); 
var StartView = require('./views/start_view.js')

var app = function() {
  var startview = new StartView();
  startview.makePlayers();
  getFighters();
  // var deck = new Deck(["api data"]);
  // var game = new Game(deck, 3);
  // var gameView = new GameView(game);
  // gameView.display();
};

var getFighters = function() {
  var url = "http://localhost:3000/fighters";
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function(event) {
    if (event.target.status !== 200) return;

    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);
    console.log(data);
  };
  request.send();
};

window.onload = app;