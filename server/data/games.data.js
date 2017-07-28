const { ObjectID } = require('mongodb');

class GamesData { // to fix
    constructor(db) {
        this.gamesInfo = db.collection('gamesInfo');
        this.games = db.collection('games');
    }

    getAllGames() {
        const startTime = new Date();
        startTime.getDate();

        return this.games.find({
            startTime: {
                $gte: startTime
            }
        }).toArray();
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
                if (+game.startTime <= +startTime && game.players.length >= game.game.maxPlayersCount) {

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

        return this.gamesInfo
            .findOne({ gameId: id }, {
                gameId: 1, name: 1, maxPlayersCount: 1, deck: 1
            })
            .then((result) => {
                let newGame = {
                    game: result,
                    startTime: startTime,
                    players: [{ username: user }],
                };

                return this.games.insert(newGame)
                    .then((game) => {
                        const createdGame = game.ops[0];
                        this.gamesInfo.update({ gameId: id }, { $addToSet: { instances: createdGame } });

                        return createdGame;
                    });
            });
    }

    saveResults(gameId, instanceId, username, score) {
        return this.games.update({
            _id: new ObjectID(instanceId),
            players: {
                $elemMatch: {
                    username: username
                }
            }
        }, {
                $set: {
                    "players.$.score": score
                }
            })
            .then(() => {
                return this.gamesInfo.update({
                    gameId: gameId,
                    "instances._id": new ObjectID(instanceId),
                }, {
                        $set: {
                            "instances.$.players.0.score": score // for multi players to add a new array of players with scores
                        }
                    });
            });
    }

    getResults(gameId) {
        //help function
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }

        return this.gamesInfo.find({ gameId: gameId }, { instances: 1 }).toArray()
            .then((results) => {
                const players = flatten(results);
                console.log(players);
                return players;
            });
    }
}


module.exports = GamesData;