var card = {
       id: 1,
       name: "Abel",
       homeCountry: "France",
       fightingStyle: "MMA",
       quote: "You've got good skills, but you have some growing to do before going pro.",
       image: "http://vignette2.wikia.nocookie.net/streetfighter/images/4/49/SFVAbel.jpg/revision/latest?cb=20160629143935",
       abilities: {
              strength: 14,
              agility:  10,
              defense:  11,
              intelligence: 7,
              charm: 5,
              resolve: 16,
              range: 12
            },
       specialMoves: ["Grappling", "Wheel Kick", "Marseilles Roll", "Falling Sky", "Tornado"]
     }
}


var cardPlay = function(card){
     var powers = card[abilities].values;
     console.log(powers);
}





window.onload = cardPlay;