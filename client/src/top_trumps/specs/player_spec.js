var Player = require('../player');
var assert = require('assert');

describe('Player', function() {

  var player1;


  beforeEach(function() {
    player1 = new Player("Paul");
    

  });

  it('should have a name', function(){
    assert.equal("Paul", player1.name);
  });

  it('should start with empty hand', function() {
    assert.equal(0, player1.cardCount());
  });

  it('should be able to add card to the hand', function() {
    var cardStub = {name: "M. Bison"};
    player1.addCard(cardStub);
    assert.equal(1, player1.cardCount());
  });

  it('should be able to remove top card on deck', function() {
    var cardStub1 = {name: "Dhalsim"};
    var cardStub2 = {name: "M. Bison"};
    var cardStub3 = {name: "Chun Li"};
    player1.addCard(cardStub1);
    player1.addCard(cardStub2);
    player1.addCard(cardStub3);
    assert.equal( cardStub1, player1.removeCard());
  });

})