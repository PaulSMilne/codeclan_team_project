var Deck = require("../deck.js");
var assert = require("assert");

describe("Deck", function(){
     it("start as an empty array", function(){
          var deck = new Deck();
          assert(0, deck.length);
     })
})