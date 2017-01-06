var StartView = require("./start_view");

var FightersView = function() {
}

FightersView.prototype = {
  display: function() {
    var splash = document.getElementById('splash');
    splash.style.display = "none";
    var fighterStats = document.getElementById('fighter_stats');
    fighterStats.style.display = "block";
    var returnMenuButton = document.getElementById('return_menu');
    returnMenuButton.onclick = function() {
      window.location.reload(false);
    }
    var returnFightersButton = document.getElementById('return_fighters');
    returnFightersButton.style.display = "none";
    returnFightersButton.onclick = function() {
      var allFighters = document.getElementById('all_fighters');
      allFighters.style.display = "flex";
      var fighterProfile = document.getElementById('fighter_profile');
      fighterProfile.style.display = "none"; 
      returnFightersButton.style.display = "none"; 
    }
    this.getFighters();
  },
  getFighters: function() {
    var url = "http://localhost:3000/fighters";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(event) {
      if (event.target.status !== 200) return;
      var jsonString = event.target.responseText;
      var data = JSON.parse(jsonString);
      this.getFighterStats(data.fighters);
    }.bind(this);
    request.send();
  },
  getFighterStats: function(fighters) {
    var url = "http://localhost:3000/fighter_stats";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(event) {
      if (event.target.status !== 200) return;
      var jsonString = event.target.responseText;
      var data = JSON.parse(jsonString);
      for (fighter of fighters) {
        var fighterStat = data.find(function(statObject) {
          return fighter.name === statObject.name;
        })
        if (fighterStat) {
          fighter.wins = fighterStat.wins;
          fighter.draws = fighterStat.draws;
          fighter.losses = fighterStat.losses;
        } else {
          fighter.wins = 0;
          fighter.draws = 0;
          fighter.losses = 0;
        }
      }
      this.createFighters(fighters);
    }.bind(this);
    request.send();
  },
  createFighters: function(fighters) {
    var allFighters = document.getElementById('all_fighters');
    for (fighter of fighters) {
      var fighterContainer = document.createElement('section');
      var image = document.createElement('img');
      image.src = fighter.image;
      image.fighter = fighter;
      var nameH1 = document.createElement('h1');
      nameH1.innerText = fighter.name;
      var abilitiesList = document.createElement('ul');
      fighterContainer.appendChild(image);
      fighterContainer.appendChild(nameH1);
      fighterContainer.appendChild(abilitiesList);
      fighterContainer.classList.add('topCard');
      fighterContainer.classList.add('small_card');
      fighterContainer.style.visibility = 'visible';
      allFighters.appendChild(fighterContainer);
      for(ability in fighter.abilities) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = ability + ": " + fighter.abilities[ability];
        listItem.appendChild(button);
        abilitiesList.appendChild(listItem);
      }
      image.onclick = function(event) {
        allFighters.style.display = "none";
        var fighterProfile = document.getElementById('fighter_profile');
        fighterProfile.style.display = "flex";
        var returnFightersButton = document.getElementById('return_fighters');
        returnFightersButton.style.display = "initial";
        this.buildFighterProfile(event.target.fighter);
        this.buildFighterStats(event.target.fighter);
      }.bind(this);
    }
  },
  buildFighterProfile: function(fighter) {
    var profile = document.getElementById('profile');
    profile.innerHTML = "";
    var image = document.createElement('img');
    image.src = fighter.image;
    var nameH1 = document.createElement('h1');
    nameH1.innerText = fighter.name;
    var genderH2 = document.createElement('h2');
    genderH2.innerText = "Gender: " + fighter.gender;
    var countryH2 = document.createElement('h2');
    countryH2.innerText = "Home Country: " + fighter.homeCountry;
    var fightingStyleH2 = document.createElement('h2');
    fightingStyleH2.innerText = "Fighting Style: " + fighter.fightingStyle;
    var specialMoveH2 = document.createElement('h2');
    specialMoveH2.innerText = "Special Moves:";
    var specialMovesList = document.createElement('ul');
    for (move of fighter.specialMoves) {
      var moveItem = document.createElement('li');
      moveItem.innerText = move;
      specialMovesList.appendChild(moveItem);
    }

    profile.appendChild(image);
    profile.appendChild(nameH1);
    profile.appendChild(genderH2);
    profile.appendChild(countryH2);
    profile.appendChild(fightingStyleH2);
    profile.appendChild(specialMoveH2);
    profile.appendChild(specialMovesList);
  },
  buildFighterStats: function(fighter) {
    var stats = document.getElementById('stats');
    stats.innerHTML = "";
    var quoteH2 = document.createElement('h2');
    quoteH2.innerText = '"' + fighter.quote + '"';
    var winsH3 = document.createElement('h3');
    var drawsH3 = document.createElement('h3');
    var lossesH3 = document.createElement('h3');
    winsH3.innerText = "Wins: " + fighter.wins;
    drawsH3.innerText = "Draws: " + fighter.draws;
    lossesH3.innerText = "Losses: " + fighter.losses;
    stats.appendChild(quoteH2);
    stats.appendChild(winsH3);
    stats.appendChild(drawsH3);
    stats.appendChild(lossesH3);
  }
};

module.exports = FightersView;
