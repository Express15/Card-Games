const Game = require('../models/game.model');
const GameInstance = require('../models/game-instance.model');
const { ObjectID } = require('mongodb');

class GamesData { // to fix
    constructor(db) {
        this.gamesInfo = db.collection('gamesInfo');
        this.games = db.collection('games');
    }

    getGame(id) {
        return this.gamesInfo
            .findOne({ gameId: id });//, { instances: { $elemMatch: { status: 'avaliable' } } });
    }

    getAll(id) {
        return this.gamesInfo.find()
            .toArray();
    }
    joinGame(id) {
        // check if is avaliable and add the player
        return this.games.findOne({
            _id: new ObjectID(id),
        });
    }
    startNewGame(id) {
        const startTime = new Date();
        startTime.setMinutes(startTime.getDate() + 30);
        let gameInfo;
        this.getGame(id)
            .then((result) => {
                console.log(result);
            });


        let newGame = {
            game: gameInfo, // cannot add the gameInfo!!!
            status: 'avaliable',
            startTime: startTime,
        };

        this.gamesInfo.update({ "gameId": id }, { $addToSet: { instances: newGame } })
        return this.games.insert(newGame);
    }
}

module.exports = GamesData;