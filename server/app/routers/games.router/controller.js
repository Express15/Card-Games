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
        return this.data.games.getGame(gameId)
            .then((game) => {
                return res.render('games/info', {
                    context: game
                });
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

        const { gameId } = req.params
        return this.data.games.startNewGame(gameId)
            .then((game) => {
                return res.render('games/play', {
                    "context": game,
                });
            });
    }
    joinGameInstance(req, res) {

    }
}

const init = (data) => {
    return new GameController(data);
};

module.exports = { init };