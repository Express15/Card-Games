const Game = require('../models/game.model');
const GameInstance = require('../models/game-instance.model');
const { ObjectID } = require('mongodb');

class GamesData { // to fix
    constructor(db) {
        this.gamesInfo = db.collection('gamesInfo');
        this.games = db.collection('games');
    }

    getGame(id, callback) {
        const startTime = new Date();
        startTime.getDate();
        return Promise.resolve(this.gamesInfo
            .aggregate(
            { $match: { gameId: id } },
            {
                $project: {
                    gameId: 1, name: 1, deck: 1, rules: 1, maxPlayersCount: 1,
                    instances: {
                        $filter: {
                            input: "$instances",
                            as: "instances",
                            cond: { $gte: ["$$instances.startTime", startTime] }
                        }
                    }
                }
            }, function (err, result) {
                callback(err, result[0]);
            }));
        // .findOne({ gameId: id }, {
        //     gameId: 1, name: 1, deck: 1, rules: 1, maxPlayersCount: 1,
        //     instances: {
        //       //  $all: [{
        //             $elemMatch: {
        //                 startTime: {
        //                     $gte: startTime
        //                 }
        //             }
        //      //   }]
        //     }
        // });
    }

    getAll(id) {
        return this.gamesInfo.find()
            .toArray();
    }

    joinGame(id, user) {
        const startTime = new Date();
        startTime.getDate();
        return this.games.findOne({ _id: new ObjectID(id) })
            .then((game) => {
                if (+game.startTime <= +startTime && game.players.length >= 5) { // game.game.maxPlayersCount
                    return null;
                }
                if (!game.players.find(p => p.username === user)) {
                    this.games.update({
                        _id: new ObjectID(id),
                    }, { $push: { players: { username: user } } });
                    game.players.push({ username: user });
                    this.gamesInfo.update({
                        "instances._id": new ObjectID(id)
                    },
                        {
                            $push: {
                                "instances.$.players": { username: user }
                            }
                        })
                }
                return game;
            })
    }

    startNewGame(id, user) {
        const startTime = new Date();
        startTime.setMinutes(startTime.getMinutes() + 30);
        let gameInfo;
        // this.getGame(id)
        //     .then((result) => {

        //     }); // gameInfo=result ???

        let newGame = {
            game: gameInfo, // cannot add the gameInfo!!!
            // status: 'avaliable',
            startTime: startTime,
            players: [{ username: user }],
        };

        return this.games.insert(newGame)
            .then((game) => {
                const createdGame = game.ops[0];
                this.gamesInfo.update({ gameId: id }, { $addToSet: { instances: createdGame } });
                return createdGame;
            });
    }
}

module.exports = GamesData;