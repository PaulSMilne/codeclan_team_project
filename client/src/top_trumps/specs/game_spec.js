var assert = require("assert");
var Game = require("../game");

var game;

describe("Game", function() {
  before(function() {
    var stubDeck = ["Ryu", "Ken", "Vega"];
    game = new Game(stubDeck);
  });

  it("should start with no players", function() {
    assert.equal(0, game.playerCount());
  });

  it("should start with a deck", function() {
    assert.equal(true, game.deck.length > 0);
  });
});