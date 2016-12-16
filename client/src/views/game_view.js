var Player = require('../top_trumps/player.js');

var GameView = function(game) {
  this.game = game;
};

GameView.prototype = {
  display: function() {
    this.buildFighterCard();  
  },
  buildFighterCard: function() {
    var gameSection = document.getElementById('game');
    var currentCard = {
      id: 1,
      name: "Abel",
      homeCountry: "France",
      fightingStyle: "MMA",
      quote: "You've got good skills, but you have some growing to do before going pro.",
      image: "http://vignette1.wikia.nocookie.net/streetfighter/images/d/de/Sf4charselectabel.png/revision/latest?cb=20150322174601",
      abilities: {
                  strength: 14,
                  agility:  10,
                  defense:  11,
                  intelligence: 7,
                  charm: 5,
                  resolve: 16,
                  range: 12
                },
      specialMoves: ["Grappling", "Wheel Kick", "Marseilles Roll", "Falling Sky", "Tornado"]
    };
    var fighterCard = document.createElement('div');
    fighterCard.classList.add('fighter-card');
    var image = document.createElement('img');
    image.src = currentCard.image;
    image.style.width = "200px";
    var abilitiesList = document.createElement('ul');
    for(ability in currentCard.abilities) {
      var listItem = document.createElement('li');
      listItem.innerText = ability + ": " + currentCard.abilities[ability];
      abilitiesList.appendChild(listItem);
    }
    fighterCard.appendChild(image);
    fighterCard.appendChild(abilitiesList);
    gameSection.appendChild(fighterCard); 
  }
}

module.exports = GameView;