var StartView = require("./start_view");

var GameView = function(game, venue) {
  this.game = game;
  this.venue = venue;
  this.isDraw = false;
};

GameView.prototype = {
  display: function() {
    var map = document.getElementById('map-view');
    var game = document.getElementById('game');
    map.style.display = "none";
    game.style.display = "flex";
    var gameBody = document.getElementById('gameBody');
    gameBody.style.backgroundImage = "url('/images/venues/" + this.venue.image + "')";
    gameBody.style.backgroundSize = "100% 100%";
    var playerDetails = document.getElementById('playerDetails');

    this.buildControlButton();
  },
  buildControlButton: function() {
    var gameBody = document.getElementById('gameBody');
    var soundEffect = document.createElement('audio');
    soundEffect.id = "sound-effect";
    soundEffect.autoplay = true;
    gameBody.appendChild(soundEffect);
    var themeMusic = document.getElementById('game-music');
    themeMusic.loop = true;
    themeMusic.src = "/audio/" + this.venue.themeMusic;
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

//   buildPlayerBar: function() {
//     var players = this.game.players;
//     var playerIndex = 0;
//     players.forEach(function(player){
//       console.log(playerIndex);
//       this.buildPlayer(playerIndex);
//       playerIndex++;
//     }.bind(this))
// },

buildPlayerBar: function() {
  var players = this.game.players;
  var playerNumber = 1;
  players.forEach(function(player){
    console.log(playerNumber);
    this.buildPlayer(player, playerNumber);
    playerNumber++;
  }.bind(this))
},
  // buildPlayer: function(playerIndex) {
  //   var playerNumber = playerIndex + 1;
  //   var playerBar = document.getElementById('player' + (playerNumber) + 'Bar');
  //   var whichPlayer = "Player " + playerNumber + ": ";
  //   var nameTag = document.createElement('h2');
  //   var cardCountTag = document.createElement('h3');
  //   var pName = this.game.players[playerIndex].name;
  //   var multiplier = this.game.players[playerIndex].cardCount();
  //   var cardsCount = ("&nbsp;<img class='cardImage' src='/images/littlecardback.png'>").repeat(multiplier);
  //
  //   playerBar.innerHTML = "";
  //   nameTag.innerText = whichPlayer + pName;
  //   cardCountTag.innerHTML = cardsCount;
  //   playerBar.appendChild(nameTag);
  //   playerBar.appendChild(cardCountTag);
  // },

  buildPlayer: function(player, playerNumber) {
    //var playerNumber = playerIndex + 1;
    var playerBar = document.getElementById('player' + playerNumber + 'Bar');
    var whichPlayer = "Player " + playerNumber + ": ";
    var nameTag = document.createElement('h2');
    var cardCountTag = document.createElement('h3');
    var pName = player.name;
    var multiplier = player.cardCount();
    var cardsCount = ("&nbsp;<img class='cardImage' src='/images/littlecardback.png'>").repeat(multiplier);

    playerBar.innerHTML = "";
    nameTag.innerText = whichPlayer + pName;
    cardCountTag.innerHTML = cardsCount;
    playerBar.appendChild(nameTag);
    playerBar.appendChild(cardCountTag);
  },

  displayRoundMessage: function() {
    var message = document.getElementById('message-display');
    message.innerHTML = "";
    var h2 = document.createElement('h2');
    message.appendChild(h2);
    var firstWord = "Round " + this.game.roundCount;
    var words = [firstWord, 3, 2, 1, "FIGHT!"];
    var multiplier = 1;
    for(word of words) {
      this.timeOutMessage(h2, multiplier, word);
      multiplier++;
    }
  },

  timeOutMessage: function(h2Element, multiplier, word) {
    setTimeout(function() {
      h2Element.innerText = word;
      var soundEffect = document.getElementById('sound-effect');
      if (word === 1) {
        soundEffect.src = "/audio/one.mp3";
      } else if (word === 2) {
        soundEffect.src = "/audio/two.mp3";
      } else if (word === 3) {
        soundEffect.src = "/audio/three.mp3";
      } else if (word === "FIGHT!") {
        soundEffect.src = "/audio/fight.mp3";
      }
    }, multiplier * 1000);
  },

  buildFirstCard: function() {
    this.buildBlood();
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var firstCard = document.getElementById('player1Card');

    } else {
      var firstCard = document.getElementById('player2Card');
    }
    var firstblood = document.createElement('img');
    firstblood.id = "first-blood";
    firstblood.classList.add("bloodImage");
    firstblood.src = "/images/blood.png";
    firstblood.style.diplay = "none";
    firstCard.appendChild(firstblood);
    firstCard.style.visibility = "visible";
    var fighter = this.game.table[1];
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var soundEffect = document.getElementById('sound-effect');
    var abilitiesList = document.createElement('ul');
    abilitiesList.id = "firstcard-abilities";
    firstCard.appendChild(image);
    firstCard.appendChild(nameH1);
    firstCard.appendChild(abilitiesList);
    var multiplier = 1;
    for(ability in fighter.abilities) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      listItem.appendChild(button);
      abilitiesList.appendChild(listItem);
      this.timeOutFirstCardAbilityBuilder(soundEffect, button, ability, fighter.abilities, multiplier);
      multiplier++;
    }

  },

  timeOutFirstCardAbilityBuilder: function(soundEffect, button, ability, abilities, multiplier) {
    setTimeout(function() {
      soundEffect.src = "/audio/punch.mp3";
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
          var abilitiesList = document.getElementById('firstcard-abilities')
          for (ability of abilitiesList.children) {
            ability.firstChild.onclick = null;
          }
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
      var soundEffect = document.getElementById('sound-effect');
      soundEffect.src = "/audio/punch.mp3";
      button.innerText = ability + ": " + abilities[ability];
      button.key = ability;
    }, multiplier * 500)
  },

  displayRoundWinner: function() {
    setTimeout(function() {
      var message = document.getElementById('message-display');
      var soundEffect = document.getElementById('sound-effect');
      message.innerHTML = "";
      message.style.visibility = "visible";
      var fighterh3 = document.createElement('h3');
      var quoteh3= document.createElement('h3');
      var playerh2 = document.createElement('h2');
      if (this.game.winningCard) {
        this.showBlood();
        if (this.game.losingCard.gender === "male") {
          soundEffect.src = "/audio/male_defeat.mp3";
        } else {
          soundEffect.src = "/audio/female_defeat.mp3";
        }
        fighterh3.innerText = this.game.winningCard.name+ " . . .";
        quoteh3.innerText =  '"' + this.game.winningCard.quote + '"';
        playerh2.innerText = this.game.currentPlayer.name + " wins";
      } else {
        this.isDraw = true;
        soundEffect.src = "/audio/draw.mp3";
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
    this.isDraw = false;
    var gameOver = document.getElementById('game-music');
    gameOver.src = "";
    gameOver.loop = false;
    gameOver.src = "/audio/game_over.mp3";
    var message = document.getElementById('message-display');
    var h2 = document.createElement("h2");
    var winner = document.createElement("h2");
    message.innerText = "";
    winner.innerText = this.game.currentPlayer.name + " wins!";
    h2.innerText = "Game Over!"
    message.appendChild(winner);
    message.appendChild(h2);
    var rematchButton = document.createElement('button');
    rematchButton.setAttribute('id', 'rematchButton');
    var changeVenueButton = document.createElement('button');
    changeVenueButton.setAttribute('id', 'changeVenueButton');
    var quitButton = document.createElement('button');
    quitButton.setAttribute('id', 'quitButton');
    quitButton.innerText = "Quit";
    rematchButton.innerText = "Rematch";
    changeVenueButton.innerText = "Change Venue";
    rematchButton.onclick = function() {
      this.game.isGameWon = false;
      this.clearCards();
      this.buildControlButton();
    }.bind(this)
    message.appendChild(rematchButton);
    message.appendChild(changeVenueButton);
    message.appendChild(quitButton);
    var startViewButton = document.getElementById('start_play');
    changeVenueButton.onclick = function() {
      game.style.display = "none";
      this.clearCards();
      startViewButton.onclick();
    }.bind(this);
    quitButton.onclick = function() {
      window.location.reload(false);
    }
  },

  clearCards: function() {
    this.collectCards(this.game.players[0]);
    this.collectCards(this.game.players[1]);
    var cardCount = this.game.table.length;
    for (var i = 0; i < cardCount; i++) {
      this.game.deck.cards.unshift(this.game.table.pop());
    }
    this.game.roundCount = 0;
    this.buildPlayerBar();
  },

  collectCards: function(player) {
    var cardCount = player.hand.length;
    for (var i = 0; i < cardCount; i++) {
      this.game.deck.cards.unshift(player.hand.pop());
    }
  },

  buildBlood: function() {
    var firstCard = document.getElementById('player1Card');
    var secondCard = document.getElementById('player2Card');

    var firstblood = document.createElement('img');
    firstblood.id = "p1-blood";
    firstblood.classList.add("bloodImage");
    firstblood.src = "/images/blood.png";
    firstblood.style.display = "none";
    firstCard.appendChild(firstblood);

    var secondBlood = document.createElement('img');
    secondBlood.id = "p2-blood";
    secondBlood.classList.add("bloodImage");
    secondBlood.src = "/images/blood.png";
    secondBlood.style.display = "none";
    secondCard.appendChild(secondBlood);
  },

  showBlood: function() {
    var currentPlayer = this.game.currentPlayer;
    if (currentPlayer === this.game.players[0]) {
      var p2Blood = document.getElementById('p2-blood');
      p2Blood.style.display = "initial"
    } else {
      var p1Blood= document.getElementById('p1-blood');
      p1Blood.style.display = "initial"
    }
  }

};

module.exports = GameView;
