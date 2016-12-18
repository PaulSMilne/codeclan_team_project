var fighter = [{
      "id": 1,
      "name": "Abel",
      "homeCountry": "France",
      "fightingStyle": "MMA",
      "quote": "You've got good skills, but you have some growing to do before going pro.",
      "image": "/images/characters/abel-new.png",
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
buildCard = function (){
     var powers = fighter[0].abilities;
     var imageURL = fighter[0].image;
     var player2Card = document.querySelector("#player2Card");
     var player2head = document.querySelector("#player2Card h1");
     player2head.innerText = fighter[0].name;
     var player2buttons = document.querySelectorAll("#player2Card li")
     player2Card.setAttribute("style", "background:no-repeat center 5px url('" + fighter[0].image + "')");
     var button1 = player2buttons[0];
     var button2 = player2buttons[1];
     var button3 = player2buttons[2];
     var button4 = player2buttons[3];
     var button5 = player2buttons[4];
     var button6 = player2buttons[5];
     var button7 = player2buttons[6];
     button1.innerHTML = "<button name='strength' value='" + powers.strength + "'>strength: " + powers.strength + "</button>";
     button2.innerHTML = "<button name='agility' value='" + powers.agility + "'>agility: " + powers.agility + "</button>";
     button3.innerHTML = "<button name='defense' value='" + powers.defense + "'>defense: " + powers.defense + "</button>";
     button4.innerHTML = "<button name='intelligence' value='" + powers.intelligence + "'>intelligence: " + powers.intelligence + "</button>";
     button5.innerHTML = "<button name='charm' value='" + powers.charm + "'>charm: " + powers.charm + "</button>";
     button6.innerHTML = "<button name='resolve' value='" + powers.resolve + "'>resolve: " + powers.resolve + "</button>";
     button7.innerHTML = "<button name='range' value='" + powers.range + "'>range: " + powers.range + "</button>";
     console.log(button1);
}

window.onload = buildCard;




