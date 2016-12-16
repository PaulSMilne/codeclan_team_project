var assert = require("assert");
var Game = require("../game");
var Deck = require("../deck");
var Player = require('../player');

var game;
var game2;
var deck;
var player1;
var player2;

describe("Game", function() {
  beforeEach(function() {
    var stubDeck = [1, 2, 3, 4, 5, 6];
    game = new Game(stubDeck, 3);
    player1 = new Player("Paul");
    player2 = new Player("Bertie");
    deck = new Deck([{
    id: 5,
    name: "Blanka",
    homeCountry: "Brazil",
    fightingStyle: "Electricity, feral maneuvers",
    quote: "Seeing you in action is a joke!",
    abilities: {
                strength: 12,
                agility:  13,
                defense:  14,
                intelligence: 10,
                charm: 6,
                resolve: 15,
                range: 11
              }
  },
  {
    id: 6,
    name: "Cammy",
    homeCountry: "UK",
    fightingStyle: "Shadaloo",
    quote: "You must enjoy being beat. Let me remodel your face one more time.",
    abilities:{
                strength: 12,
                agility:  15,
                defense:  11,
                intelligence: 10,
                charm: 10,
                resolve: 12,
                range: 10
              }
  }]);
    game2 = new Game(deck, 1);
    game2.addPlayer(player1);
    game2.addPlayer(player2);


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
  });

  it("should be able to deal cards to each player", function() {
    game2.deal();
    assert.equal(1, player1.cardCount());
    assert.equal(1, player2.cardCount());
  });

  it("should be able to play a round", function() {
    game2.deal();
    game2.playRound("resolve");
    assert.equal(2, player1.cardCount());
    assert.equal(0, player2.cardCount());
  });

  it("should be able to populate and display table", function(){
    game2.deal();
    game2.populateTable();
    assert.equal(2, game2.table.length);
  });

  it("should be able to compare abilities when one is selected", function() {
    game2.deal();
    game2.populateTable();
    game2.compareAbility("defense");
    console.log("Player2", player2.hand);
    console.log("player1 ", player1.hand);

    assert.equal(2, player1.cardCount());

  })

});