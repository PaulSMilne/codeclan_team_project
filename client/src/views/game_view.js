var StartView = require("./start_view");

var GameView = function(game, venue) {
  this.game = game;
  this.venue = venue;
  this.isDraw = false;
};

GameView.prototype = {
  display: function() {
    
    console.log("venue", this.venue);
    var map = document.getElementById('map-view');
    var game = document.getElementById('game');
    map.style.display = "none";
    game.style.display = "initial";
    var gameBody = document.getElementById('gameBody');
    gameBody.style.backgroundImage = "url('/images/venues/" + this.venue.image + "')";
    var playerDetails = document.getElementById('playerDetails');
    this.buildControlButton();
  },
  buildControlButton: function() {
    var message = document.getElementById('message-display');
    message.innerHTML = "";
    var controlButton = document.createElement('button');
    message.appendChild(controlButton);
    controlButton.id = 'startGameButton';
    controlButton.style.display = "initial";
    controlButton.innerText = "Start Game";
    controlButton.onclick = function() {
      this.game.deal();
      this.buildPlayerBar();
      this.game.populateTable();
      controlButton.style.display = "none";
      this.displayRoundMessage();
      setTimeout(function() {
        message.style.visibility = "hidden";
        this.buildFirstCard();
      }.bind(this), 6500);
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
    var firstWord = "Round " + this.game.roundCount;
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
    }, multiplier * 1000);
  },
  
  buildFirstCard: function() {
    console.log(this);
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var firstCard = document.getElementById('player1Card');

    } else {
      var firstCard = document.getElementById('player2Card');
    }
    firstCard.style.visibility = "visible";
    var fighter = this.game.table[1];
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var abilitiesList = document.createElement('ul');
    firstCard.appendChild(image);
    firstCard.appendChild(nameH1);
    firstCard.appendChild(abilitiesList);
    var multiplier = 1;
    for(ability in fighter.abilities) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      listItem.appendChild(button);
      abilitiesList.appendChild(listItem);
      this.timeOutFirstCardAbilityBuilder(button, ability, fighter.abilities, multiplier);
      multiplier++;
    }
  
  },

  timeOutFirstCardAbilityBuilder: function(button, ability, abilities, multiplier) {
    setTimeout(function() {      
      button.innerText = ability + ": " + abilities[ability];
      button.key = ability;
      button.onclick = function(event) {
        if (!this.isDraw) {
          event.target.style.backgroundColor = "black";
          event.target.style.color = "#C9A955";
          var chosenAbility = event.target.key
          this.buildSecondCard(chosenAbility);
          this.game.compareAbility(chosenAbility);
          this.displayRoundWinner();  
        }
      }.bind(this);
      
    }.bind(this), multiplier * 500)
  },

  buildSecondCard: function(chosenAbility) {
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var secondCard = document.getElementById('player2Card');

    } else {
      var secondCard = document.getElementById('player1Card');
    }
    secondCard.style.visibility = "visible";
    var fighter = this.game.table[0];
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var abilitiesList = document.createElement('ul');
    secondCard.appendChild(image);
    secondCard.appendChild(nameH1);
    secondCard.appendChild(abilitiesList);
    var multiplier = 1;
    for(ability in fighter.abilities) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      listItem.appendChild(button);
      abilitiesList.appendChild(listItem); 
      if (ability !== chosenAbility) {
        this.timeOutSecondCardAbilityBuilder(button, ability, fighter.abilities, multiplier);
        multiplier++;
      } else {
        button.id = "matchingAbilityButton";
      }
    }
    var matchingButton = document.getElementById('matchingAbilityButton');
    matchingButton.style.backgroundColor = "black";
    matchingButton.style.color = "#C9A955";
    this.timeOutSecondCardAbilityBuilder(matchingButton, chosenAbility, fighter.abilities, multiplier);
  },

  timeOutSecondCardAbilityBuilder: function(button, ability, abilities, multiplier) {
    setTimeout(function() {      
      button.innerText = ability + ": " + abilities[ability];
      button.key = ability;      
    }, multiplier * 500)
  },

  displayRoundWinner: function() {
    setTimeout(function() {
      var message = document.getElementById('message-display');
      message.innerHTML = "";
      message.style.visibility = "visible";
      var fighterh3 = document.createElement('h3');
      var quoteh3= document.createElement('h3');
      var playerh2 = document.createElement('h2');
      if (this.game.winningCard) {
        fighterh3.innerText = this.game.winningCard.name+ " . . .";
        quoteh3.innerText =  '"' + this.game.winningCard.quote + '"';
        playerh2.innerText = this.game.currentPlayer.name + " wins";
      } else {
        this.isDraw = true;
        playerh2.innerText = "DRAW!";
      }
      message.appendChild(fighterh3);
      message.appendChild(quoteh3);
      message.appendChild(playerh2);
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
            message.style.visibility = "hidden";
            this.isDraw = false;
            this.buildFirstCard();
          }.bind(this), 6500);
        }.bind(this),5000);
      }
    }.bind(this), 4000); 
  },
  clearLastRound: function() {
    var firstCard = document.getElementById('player1Card');
    firstCard.innerHTML = "";
    firstCard.style.visibility = "hidden";
    var secondCard = document.getElementById('player2Card');
    secondCard.innerHTML = "";
    secondCard.style.visibility = "hidden";
  },
  gameOver: function() {
    var message = document.getElementById('message-display');
    var h2 = document.createElement("h2");
    var winner = document.createElement("h2");
    message.innerText = "";
    winner.innerText = this.game.currentPlayer.name + " wins!";
    h2.innerText = "Game Over!"
    message.appendChild(winner);
    message.appendChild(h2);
    var rematchButton = document.createElement('button');
    var changeVenueButton = document.createElement('button');
    rematchButton.innerText = "Rematch";
    changeVenueButton.innerText = "Change Venue";
    rematchButton.onclick = function() {
      this.clearCards();
      this.buildControlButton(); 
    }.bind(this)
    message.appendChild(rematchButton);
    message.appendChild(changeVenueButton);
    var startViewButton = document.getElementById('start_play');
    changeVenueButton.onclick = function() {
      this.clearCards();
      startViewButton.onclick();
    }.bind(this);
  },

  clearCards: function() {
    this.collectCards(this.game.players[0]);
    this.collectCards(this.game.players[1]);
    this.game.roundCount = 0;
    this.buildPlayerBar();
  },

  collectCards: function(player) {
    var cardCount = player.hand.length;
    for (var i = 0; i < cardCount; i++) {
      this.game.deck.cards.unshift(player.hand.pop());
    }
  }

};

module.exports = GameView;