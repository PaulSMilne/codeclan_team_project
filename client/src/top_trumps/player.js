var Player = function(name){
  this.name = name;
  this.hand =[]
}

Player.prototype = {
  cardCount: function() {
    return this.hand.length;
  }
}

module.exports = Player;