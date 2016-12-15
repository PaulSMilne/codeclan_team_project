var Deck = require("../deck.js");
var assert = require("assert");

describe("Deck", function(){
     it("should be an array of objects", function(){
          var deck = new Deck([{name: "Fighter1", strength: 15}, {name: "Fighter2", strength: 12}]);
          assert("2", deck.length);
     })
})