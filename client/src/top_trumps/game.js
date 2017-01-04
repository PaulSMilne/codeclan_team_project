var Game = function(deck, handSize) {
  this.deck = deck;
  this.handSize = handSize;
  this.players = [];
  this.table = [];
  this.currentPlayer;
  this.isGameWon = false;
  this.winningCard = null;
  this.losingCard = null;
  this.roundCount = 0;
};

Game.prototype = {
  playerCount: function() {
    return this.players.length;
  },
  addPlayer: function(newPlayer) {
    this.players.push(newPlayer);
  },
  shuffleDeck: function() {
    this.deck.shuffleCards();
  },
  deal: function() {
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
    this.roundCount++;
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
  },
  compareAbility: function(ability) {
    var firstCard = this.table[1].abilities[ability];
    var secondCard = this.table[0].abilities[ability];
    if(firstCard === secondCard ) {
      this.winningCard = null;
      this.losingCard = null;
    }
    else if (firstCard > secondCard ) {
      this.winningCard = this.table[1];
      this.losingCard = this.table[0];
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.winningCard = this.table[0];
      this.losingCard = this.table[1];
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
      this.winningCard = null;
      this.losingCard = null;
      return;
    }
    else if (firstCard > secondCard) {
      this.winningCard = this.table[1];
      this.losingCard = this.table[0];
      this.updateTurn();
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.winningCard = this.table[0];
      this.losingCard = this.table[1];
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
    if (this.players[0].hand.length === 0 || this.players[1].hand.length === 0) {
      this.isGameWon = true;
    }
  }
};

module.exports = Game;
