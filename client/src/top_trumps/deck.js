var Deck = function(){
     this.cards = [];
}

Deck.prototype = {
     addCards: function(cards){
          this.cards = cards;
     }
}

module.exports = Deck;