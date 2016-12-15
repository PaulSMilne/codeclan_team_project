var Deck = require("../deck.js");
var assert = require("assert");

describe("Deck", function(){
     it("start as an empty array", function(){
          var deck = new Deck();
          assert.equal(0, deck.cards.length);
     })
})