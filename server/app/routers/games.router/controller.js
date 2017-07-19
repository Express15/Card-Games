class GameController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        //   return this.data.games.getAll()
        //      .then((games) => {
        const games = this.data.games.getAll();
        return res.render('games/all', {
            context: games,
        });
        //      });
    }
    getGame(req, res) {
        const { gameId } = req.params
        //   return data.games.getGame(gameId)
        //       .then((game) => {
        const game = this.data.games.getGame(gameId);
        return res.render('games/game', {
            id: game.id,
            name: game.name
        });
        //       });
    }
}

const init = (data) => {
    return new GameController(data);
};

module.exports = { init };