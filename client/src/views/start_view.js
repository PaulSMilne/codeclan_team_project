var Player = require('../top_trumps/player')

var StartView = function() {
  this.player1 = null;
  this.player2 = null;
};

StartView.prototype = {
  makePlayers: function() {
    var startPlayButton = document.getElementById('start_play');
    startPlayButton.onclick = function() {
      var p1 = document.getElementById('player1');
      var p2 = document.getElementById('player2');
      if (!p1.value || !p2.value) {
        var errorDiv =document.getElementById('warning');
        errorDiv.innerHTML = "Please enter names for players to start play";
      }
      this.player1 = new Player(p1.value);
      this.player2 = new Player(p2.value);
      console.log("p1", this.player1);
      console.log("p2", this.player2);
    }.bind(this);
  }
}

module.exports = StartView;