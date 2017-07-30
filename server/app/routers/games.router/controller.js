class GameController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        return this.data.games.getAll()
            .then((games) => {
                return res.render('games/all', {
                    context: games,
                });
            });
    }

    getGame(req, res) {
        const { gameId } = req.params;
        return this.data.games.getGame(gameId, function (err, result) {
            if (err) {
                // return error 
            } else {
                // somewhere to use getGameResults
                return res.render('games/info', {
                    context: result,
                });
            }
        });
    }

    createGameInstance(req, res) {
        if (req.isAuthenticated()) {
            const { gameId } = req.params;
            const user = req.user.username;

            return this.data.games.startNewGame(gameId, user)
                .then((game) => {
                    const innerGameId = game.game.gameId;
                    const instanceId = game._id;
                    // eslint-disable-next-line
                    return res.redirect('/games/' + innerGameId + '/play/' + instanceId);
                });
        }

        return res.redirect('/auth/sign-in');
    }

    joinGameInstance(req, res) {
        if (req.isAuthenticated()) {
            const { id } = req.params;
            const user = req.user.username;

            return this.data.games.joinGame(id, user)
                .then((game) => {
                    if (game === null) {
                        res.redirect(req.get('referer'));
                    }

                    return res.render('games/play', {
                        context: game,
                    });
                });
        }
        return res.redirect('/auth/sign-in');
    }

    saveGameResults(req, res) {
        const { score } = req.body;
        const { username } = req.user;
        const { gameId, id } = req.params;

        return this.data.users.saveResults(username, score)
            .then(() => {
                return this.data.games.saveResults(gameId, id, username, score);
            });
    }

    // getGameResults(req, res) {
    //     const { gameId } = req.params

    //     return this.data.games.getResults(gameId)
    //     .then((results) => {
    //             return res.render('games/statistics', {
    //                 context: results,
    //             });
    //         });
    // }
}

const init = (data) => {
    return new GameController(data);
};

module.exports = { init };
