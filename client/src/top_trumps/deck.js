var _ = require('underscore');
//this requires npm install --save underscore to install the underscore library
var Deck = function(){
     this.cards = [];
}

Deck.prototype = {
     addCards: function(cards){
          this.cards = cards;
     },

     shuffleCards: function(){
          this.cards = _.shuffle(this.cards);
     }
}

module.exports = Deck;