var Game = function(deck, handSize) {
  this.deck = deck;
  this.handSize = handSize;
  this.players = [];
  this.table = [];
  this.currentPlayer;
};

Game.prototype = {
  playerCount: function() {
    return this.players.length;
  },
  addPlayer: function(newPlayer) {
    this.players.push(newPlayer);
  },
  deal: function() {
    // this.deck.shuffleCards();
    this.currentPlayer = this.players[0];
    var cardCount = 0;
    while (cardCount < this.handSize) {
      for (player of this.players) {
        player.addCard(this.deck.cards.shift());
      }
      cardCount++;
    }
  },
  populateTable: function() {
    this.table.push(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.push(this.currentPlayer.removeCard());
    this.updateTurn();
  },
  compareAbility: function(ability) {
    if(this.table[0].abilities[ability] === this.table[1].abilities[ability]) {
      this.game.populateTable();
    }
    else if (this.table[0].abilities[ability] > this.table[1].abilities[ability]) {
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.updateTurn();
        while (this.table.length > 0) {
          this.currentPlayer.addCard(this.table.pop());
        }
    }
  },
  playRound: function(ability) {
    this.table.push(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.push(this.currentPlayer.removeCard());
    if (this.table[0].abilities[ability] > this.table[1].abilities[ability]) {
      this.updateTurn();
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
        while(this.table.length > 0) {
          this.currentPlayer.addCard(this.table.pop());
        }
    }
  },
  updateTurn: function() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  },
  //winchecker loops round each hand to see if = 0, then declare winner is other person

};

module.exports = Game;