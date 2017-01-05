#JavaScript Team Project

##Brief

Create a browser game based on an existing card or dice game. Model the game logic and then display it in the browser for a user to interact with.

##Our game

Build Top Trumps style browser based card game using our own API of characters based on a popular video game of the 1990s. Player must be given hand of cards and be able to select ability of card which is compared against card of other player. Player with highest value wins a round, the player who captures all the other players' cards wins the game.

Our game is for two players. The players sign in and choose how many cards to have in their hands, and pick a venue to fight in.

The styling is retro-video-game using fighter and venue graphics based on the original series of games.

##Development environment

We developed the game to run on a local npm Express server, using Webpack to bundle the JavaScript files for serving to the browser.

## Installing and Running App

### Requirements
* Node.js with NPM - install instructions [here](https://docs.npmjs.com/getting-started/installing-node)
* MongoDB - install instructions [here](https://docs.mongodb.com/manual/installation/)

1. Clone repository using `git clone https://github.com/PaulSMilne/codeclan_team_project.git`
2. Install dependancies express, webpack and underscore using `npm install` from the root project folder.
3. Start running mongoDB using `mongod`.
4. Create bundle.js file using `webpack` or `webpack -w` from codeclan_team_project/client folder.
5. Start server using `npm start` from root project folder.
6. Application will run on localhost:3000.

### Run Dev Tests
1. Install mocha using `npm install` from codeclan_team_project/client/src/top_trumps folder.
2. Run tests using `npm test` from same folder.



