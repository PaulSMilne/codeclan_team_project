var Game = function(deck, handSize) {
  this.deck = deck;
  this.handSize = handSize;
  this.players = [];
};

Game.prototype = {
  playerCount: function() {
    return this.players.length;
  },
  addPlayer: function(newPlayer) {
    this.players.push(newPlayer);
  },
  deal: function() {
    deck.shuffleCards();
    var cardCount = 0;
    while (cardCount < this.handSize) {
      for (player of this.players) {
        player.addCard(deck.cards.shift());
      }
      cardCount++;
    }

  }
};

module.exports = Game;