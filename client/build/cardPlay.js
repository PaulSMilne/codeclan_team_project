var fighter = [{
      "id": 1,
      "name": "Abel",
      "homeCountry": "France",
      "fightingStyle": "MMA",
      "quote": "You've got good skills, but you have some growing to do before going pro.",
      "image": "/images/characters/abel.png",
      "abilities": {
                  "strength": 14,
                  "agility":  10,
                  "defense":  11,
                  "intelligence": 7,
                  "charm": 5,
                  "resolve": 16,
                  "range": 12
                },
      "specialMoves": ["Grappling", "Wheel Kick", "Marseilles Roll", "Falling Sky", "Tornado"]
    }];
// console.log(fighter[0].abilities);

// var cardPlay = function (jsonObject, index){
//      var powers = jsonObject[index].abilities;
//      var imageURL = jsonObject[index].image;
//      var player1Card = document.querySelector("#player1Card");
//      console.log(player1Card);
     // player1Card.setAttribute("style", "background:no-repeat center 5px url('/images/characters/chun-li.png')");

     // return powers;
     // console.log(powers.strength);
// }
window.onload = function (){
     var powers = fighter[0].abilities;
     var imageURL = fighter[0].image;
     var player2Card = document.querySelector("#player2Card");
     var player2head = document.querySelector("#player2Card h1");
     player2head.innerText = fighter[0].name;
     var player1buttons = document.querySelectorAll("#player1Card li button")
     var player2buttons = document.querySelectorAll("#player2Card li")
     console.log(player1buttons);
     player2Card.setAttribute("style", "background:no-repeat center 5px url('" + fighter[0].image + "')");
}


