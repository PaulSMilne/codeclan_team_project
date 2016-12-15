var Deck = require("../deck.js");
var assert = require("assert");

describe("Deck", function(cards){
     it("start with 2 cards", function(){
          var cards = [{name: "fighter1", strength: 15}, {name: "fighter2", strength: 10}];
          var deck = new Deck(cards);
          assert.equal(2, deck.cards.length);
     });
    
})
