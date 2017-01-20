var _ = require('underscore');
//run npm install to install the underscore library
var Deck = function(cards){
     this.cards = cards;
}

Deck.prototype = {

     shuffleCards: function(){
          this.cards = _.shuffle(this.cards);
     }
}

module.exports = Deck;
