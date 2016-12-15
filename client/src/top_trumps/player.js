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
  removeCard: function() {
    return this.hand.shift();
  },
}

module.exports = Player;