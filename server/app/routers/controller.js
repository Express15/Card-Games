class MainController {
    constructor(data) {
        this.data = data;
    }

    
    getAllActiveGames(req, res) {
        return this.data.games.getAllGames()
            .then((games) => {

                return res.render('home', {
                    context: games,
                });
            });
    }
    
    getTotalResults(req, res) {
        return this.data.users.getResults()
            .then((results) => {
                return res.render('statistics', {
                    context: results,
                });
            });
    } 
}


const init = (data) => {
    return new MainController(data);
};

module.exports = { init };