var Player = require('../top_trumps/player.js');

var GameView = function(game) {
  this.game = game;
};

GameView.prototype = {
  display: function() {
    var splash = document.getElementById('splash');
    var game = document.getElementById('game');
    splash.style.display = "none";
    game.style.display = "flex";
    game.style.flexDirection = "column";
    var gameBody = document.getElementById('gameBody');
    gameBody.style.display = "flex";
    gameBody.style.flexDirection = "row";
    var playerDetails = document.getElementById('playerDetails');
    playerDetails.style.display = "flex";
    playerDetails.style.flexDirection = "row";
    this.buildControlButton();
  },
  buildControlButton: function() {
    var gameSection = document.getElementById('game');
    var controlButton = document.createElement('button');
    controlButton.innerText = "Start Game";
    gameSection.appendChild(controlButton);
    controlButton.onclick = function() {
      this.game.deal();
      this.buildPlayerBar();
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

  buildPlayerBar: function() {
    player1bar = document.getElementById('player1Bar');
    player1Bar.innerHTML = "";
    var p1name = document.createElement('h2');
    p1name.innerText = this.game.players[0].name;
    player1bar.appendChild(p1name);
    var p1cardCount = document.createElement('h3');
    p1cardCount.innerText = this.game.players[0].cardCount() + " cards in hand";
    player1bar.appendChild(p1cardCount); 

    player2bar = document.getElementById('player2Bar');
    player2Bar.innerHTML = "";
    var p2name = document.createElement('h2');
    p2name.innerText = this.game.players[1].name;
    player2bar.appendChild(p2name);
    var p2cardCount = document.createElement('h3');
    p2cardCount.innerText = this.game.players[1].cardCount() + " cards in hand";
    player2bar.appendChild(p2cardCount); 

  },

  displayRoundMessage: function() {
    var message = document.getElementById('message-display');
    message.innerHTML = "";
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
    var fighter = this.game.table[1];
    firstCard.style.display = "inline-block";
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var abilitiesList = document.createElement('ul');
    for(ability in fighter.abilities) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      button.innerText = ability + ": " + fighter.abilities[ability];
      button.key = ability;
      button.onclick = function(event) {
        console.log("selected ability", event.target.key);
        this.buildSecondCard();
        this.game.compareAbility(event.target.key);
        this.displayRoundWinner();
      }.bind(this);
      listItem.appendChild(button);
      abilitiesList.appendChild(listItem);
    }
    firstCard.appendChild(image);
    firstCard.appendChild(nameH1);
    firstCard.appendChild(abilitiesList);

  },

  buildSecondCard: function() {
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var secondCard = document.getElementById('player2Card');

    } else {
      var secondCard = document.getElementById('player1Card');
    }
    var fighter = this.game.table[0];
    secondCard.style.display = "inline-block";
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var abilitiesList = document.createElement('ul');
    for(ability in fighter.abilities) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      button.innerText = ability + ": " + fighter.abilities[ability];
      listItem.appendChild(button);
      abilitiesList.appendChild(listItem);
    }
    secondCard.appendChild(image);
    secondCard.appendChild(nameH1);
    secondCard.appendChild(abilitiesList);
  },
  displayRoundWinner: function() {
    var message = document.getElementById('message-display');
    message.innerHTML = "";
    message.style.display = "initial";
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    if (this.game.winningCard) {
      h2.innerText = this.game.currentPlayer.name + " wins";
      h3.innerText = this.game.winningCard.quote;
    } else {
      h2.innerText = "draw!";
    }
    message.appendChild(h2);
    message.appendChild(h3);
    if(this.game.isGameWon) {
      setTimeout(function() {
        this.clearLastRound();
        this.gameOver();
        this.buildPlayerBar();
      }.bind(this), 5000);
    } else 
    {
      setTimeout(function () {
        this.clearLastRound();
        this.buildPlayerBar();
        this.game.populateTable();
        this.displayRoundMessage();
        setTimeout(function() {
          var message = document.getElementById('message-display');
          message.style.display = "none";
          this.buildFirstCard();
        }.bind(this), 5000);
      }.bind(this),5000);
    } 
  },
  clearLastRound: function() {
    var firstCard = document.getElementById('player1Card');
    firstCard.innerHTML = "";
    firstCard.style.display = "none";
    var secondCard = document.getElementById('player2Card');
    secondCard.innerHTML = "";
    secondCard.style.display = "none";
  },
  gameOver: function() {
    var message = document.getElementById('message-display');
    message.innerText = "Game Over!";
  }

};

module.exports = GameView;