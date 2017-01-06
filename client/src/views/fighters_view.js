var StartView = require("./start_view");

var FightersView = function() {
}

FightersView.prototype = {
  display: function() {
    var splash = document.getElementById('splash');
    splash.style.display = "none";
    var fighterStats = document.getElementById('fighter_stats');
    fighterStats.style.display = "block";
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
      this.createFighters(data);
    }.bind(this);
    request.send();
  },
  createFighters: function(data) {
    var allFighters = document.getElementById('all_fighters');
    for (fighter of data.fighters) {
      var fighterContainer = document.createElement('section');
      var image = document.createElement('img');
      image.src = fighter.image;
      var nameH1 = document.createElement('h1');
      nameH1.innerText = fighter.name;
      var abilitiesList = document.createElement('ul');
      fighterContainer.appendChild(image);
      fighterContainer.appendChild(nameH1);
      fighterContainer.appendChild(abilitiesList);
      fighterContainer.classList.add('topCard');
      fighterContainer.style.visibility = 'visible';
      allFighters.appendChild(fighterContainer);
      for(ability in fighter.abilities) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = ability + ": " + fighter.abilities[ability];
        listItem.appendChild(button);
        abilitiesList.appendChild(listItem);
      }
    }
  }
};

module.exports = FightersView;
