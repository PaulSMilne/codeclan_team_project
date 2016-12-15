var Player = require('../player');
var Card = require('../card');
var assert = require('assert');

describe('Player', function() {

  var player1;


  beforeEach(function() {
    player1 = new Player("Paul");

  })

  it('should have a name', function(){
    assert.equal("Paul", player1.name);
  })
})