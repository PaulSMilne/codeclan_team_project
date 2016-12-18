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
    controlButton.innerText = "Current Player Begin";
    gameSection.appendChild(controlButton);
    controlButton.onclick = function() {
      this.game.deal();
      this.game.populateTable();
      this.buildFirstCard();
    }.bind(this);
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
      abilitiesList.appendChild(listItem);
    }
    firstCard.appendChild(image);
    firstCard.appendChild(abilitiesList);
  }
}

module.exports = GameView;