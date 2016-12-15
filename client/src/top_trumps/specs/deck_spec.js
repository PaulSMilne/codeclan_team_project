var Deck = require("../deck.js");
var assert = require("assert");

describe("Deck", function(){
     it("start as an empty array", function(){
          var deck = new Deck();
          assert.equal(0, deck.cards.length);
     });
     it("can add objects to the array", function(){
          var deck = new Deck();
          var cards = [{name: "fighter1", strength: 15}, {name: "fighter2", strength: 10}];
          deck.addCards(cards);
          assert.equal(2, deck.cards.length);
     };
})