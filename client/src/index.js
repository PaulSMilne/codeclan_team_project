var Deck = require('./top_trumps/deck.js');
var Game = require('./top_trumps/game.js');
var GameView = require('./views/game_view.js'); 

var app = function() {
 var deck = new Deck(["api data"]);
 var game = new Game(deck, 3);
 var gameView = new GameView(game); 
};


window.onload = app;