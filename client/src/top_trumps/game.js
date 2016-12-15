var Game = function() {
  this.players = [];
};

Game.prototype = {
  playerCount: function() {
    return this.players.length;
  }
};

module.exports = Game;