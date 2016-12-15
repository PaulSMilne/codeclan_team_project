var assert = require("assert");
var Game = require("../game");

var game;

describe("Game", function() {
  before(function() {
    var stubDeck = [1, 2, 3, 4, 5, 6];
    game = new Game(stubDeck, 3);
  });

  it("should start with no players", function() {
    assert.equal(0, game.playerCount());
  });

  it("should start with a deck", function() {
    assert.equal(true, game.deck.length > 0);
  });

  it("should be able add a player", function() {
    var player1Stub = {name: "Diana", hand: []};
    game.addPlayer(player1Stub);
    assert.equal(1, game.playerCount());
  });

  it("should have a hand size", function() {
    assert.equal(3, game.handSize);
  })
});