var Game = function(deck, handSize) {
  this.deck = deck;
  this.handSize = handSize;
  this.players = [];
  this.table = [];
  this.currentPlayer;
  this.isGameWon = false;
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
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
  },
  compareAbility: function(ability) {
    var firstCard = this.table[1].abilities[ability];
    var secondCard = this.table[0].abilities[ability];
    if(firstCard === secondCard ) {
      return;
    }
    else if (firstCard > secondCard ) {
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.updateTurn();
        while (this.table.length > 0) {
          this.currentPlayer.addCard(this.table.pop());
        }
    }
    this.gameOverCheck();
  },
  playRound: function(ability) {
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.unshift(this.currentPlayer.removeCard());
    var firstCard = this.table[1].abilities[ability];
    var secondCard = this.table[0].abilities[ability];
    if(firstCard === secondCard ) {
      return;
    }
    else if (firstCard > secondCard) {
      this.updateTurn();
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
        while(this.table.length > 0) {
          this.currentPlayer.addCard(this.table.pop());
        }
    }
    this.gameOverCheck();
  },
  updateTurn: function() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  },
  roundWinner: function() {
    return this.currentPlayer;
  },
  gameOverCheck: function() {
    if (this.players[0].hand.length ===0 || this.players[1].hand.length===0) {
      this.isGameWon = true;
    }
  }
  //winchecker loops round each hand to see if = 0, then declare winner is other person

};

module.exports = Game;