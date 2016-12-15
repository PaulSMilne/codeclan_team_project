var Deck = require('./deck.js');

var deck = new Deck();

var array = [1,2,3,4,5,6];

deck.addCards(array);

console.log(deck.cards);

deck.shuffleCards();

console.log(deck.cards);