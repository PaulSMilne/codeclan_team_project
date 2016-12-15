var Player = function(name){
  this.name = name;
  this.hand =[]
}

Player.prototype = {
  cardCount: function() {
    return this.hand.length;
  },
  addCard: function(card) {
    this.hand.push(card);
  },
}

module.exports = Player;