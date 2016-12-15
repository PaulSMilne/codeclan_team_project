var Game = function(deck) {
  this.deck = deck;
  this.players = [];
};

Game.prototype = {
  playerCount: function() {
    return this.players.length;
  }
};

module.exports = Game;