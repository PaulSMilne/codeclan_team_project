var assert = require("assert");
var Game = require("../game");

var game;

describe("Game", function() {
  before(function() {
    game = new Game();
  });

  it("should start with no players", function() {
    assert.equal(0, game.playerCount());
  });
});