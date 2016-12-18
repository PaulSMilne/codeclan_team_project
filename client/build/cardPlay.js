var fighter = [{
      "id": 1,
      "name": "Abel",
      "homeCountry": "France",
      "fightingStyle": "MMA",
      "quote": "You've got good skills, but you have some growing to do before going pro.",
      "image": "http://vignette2.wikia.nocookie.net/streetfighter/images/4/49/SFVAbel.jpg/revision/latest?cb=20160629143935",
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

var cardPlay = function (jsonObject, index){
     var powers = jsonObject[index].abilities;
     // return powers;
     console.log(powers.strength);
}


window.onload = cardPlay(fighter,0);