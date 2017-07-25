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

    getGame(req, res) { // get active games
        const { gameId } = req.params
        return this.data.games.getGame(gameId, function (err, result) {
            if (err) {
                // return error here using res
            } else {
               return res.render('games/info', {
                    context: result
                });
            }
        });
           
    }

    showTotalResults(req, res) { // in another router
        return this.data.users.getResults()
            .then((results) => {
                return res.render('statistics', {
                    context: results,
                });
            });
    }

    createGameInstance(req, res) {
        if (req.isAuthenticated()) {
            const { gameId } = req.params;
             const user=req.user.username;
            return this.data.games.startNewGame(gameId,user)
                .then((game) => {
                    //joinGame
                    return res.render('games/play', {
                        context: game,
                    });
                });
        }
        else {
            return res.redirect('/auth/sign-in');
        }
    }

    joinGameInstance(req, res) {
        if (req.isAuthenticated()) {
            const { id } = req.params;
            const user=req.user.username;
            return this.data.games.joinGame(id,user)
                .then((game) => {
                    if(game===null){
                        res.redirect(req.get('referer'));
                    }
                    return res.render('games/play', {
                        context: game,
                    });
                });
        }
        else {
            return res.redirect('/auth/sign-in');
        }
    }
}

const init = (data) => {
    return new GameController(data);
};

module.exports = { init };