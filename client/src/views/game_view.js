var Player = require('../top_trumps/player.js');

var GameView = function(game) {
  this.game = game;
};

GameView.prototype = {
  display: function() {
    var splash = document.getElementById('splash');
    var game = document.getElementById('game');
    splash.style.display = "none";
    game.style.display = "initial";
    this.buildControlButton();
  },
  buildControlButton: function() {
    var gameSection = document.getElementById('game');
    var controlButton = document.createElement('button');
    controlButton.innerText = "Start Game";
    gameSection.appendChild(controlButton);
    controlButton.onclick = function() {
      this.game.deal();
      this.game.populateTable();
      controlButton.style.display = "none";
      this.displayRoundMessage();
      setTimeout(function() {
        var message = document.getElementById('message-display');
        message.style.display = "none";
        this.buildFirstCard();
      }.bind(this), 5000);
    }.bind(this);
  },

  displayRoundMessage: function() {
    var message = document.getElementById('message-display');
    var h2 = document.createElement('h2');
    message.appendChild(h2);
    var firstWord = "Round " + this.game.roundCount + "!";
    var words = [firstWord, 3, 2, 1, "FIGHT!!!"];
    var multiplier = 1;
    for(word of words) {
      console.log("for word",word);
      this.timeOutMessage(h2, multiplier, word);
      multiplier++;
    }
  },

  timeOutMessage: function(h2Element, multiplier, word) {
    setTimeout(function() {
      console.log("timeout word",word);
      h2Element.innerText = word;
    }, multiplier * 750);
  },
  
  buildFirstCard: function() {
    console.log(this);
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var firstCard = document.getElementById('player1Card');

    } else {
      var firstCard = document.getElementById('player2Card');
    }
    var image = document.createElement('img');
    image.src = this.game.table[1].image;
    var abilitiesList = document.createElement('ul');
    for(ability in this.game.table[1].abilities) {
      var listItem = document.createElement('li');
      listItem.innerText = ability + ": " + this.game.table[1].abilities[ability];
      listItem.key = ability;
      listItem.onclick = function(event) {
        console.log("selected ability", event.target.key);
        this.buildSecondCard();
        this.game.compareAbility(event.target.key);
        this.displayRoundWinner();
      }.bind(this);
      abilitiesList.appendChild(listItem);
    }
    firstCard.appendChild(image);
    firstCard.appendChild(abilitiesList);
  },

  buildSecondCard: function() {
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var secondCard = document.getElementById('player2Card');

    } else {
      var secondCard = document.getElementById('player1Card');
    }
    var image = document.createElement('img');
    image.src = this.game.table[0].image;
    var abilitiesList = document.createElement('ul');
    for(ability in this.game.table[0].abilities) {
      var listItem = document.createElement('li');
      listItem.innerText = ability + ": " + this.game.table[0].abilities[ability];
      abilitiesList.appendChild(listItem);
    }
    secondCard.appendChild(image);
    secondCard.appendChild(abilitiesList);
  },
  displayRoundWinner: function() {
    var message = document.getElementById('message-display');
    message.innerHTML = "";
    message.style.display = "initial";
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    h2.innerText = this.game.currentPlayer.name + " wins";
    h3.innerText = this.game.winningCard.quote;
    message.appendChild(h2);
    message.appendChild(h3);
  }
}

module.exports = GameView;