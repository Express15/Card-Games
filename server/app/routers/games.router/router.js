const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', (req, res) => { // pages
            return controller.getAll(req, res);
        })
        .get('/statistics', (req, res) => { // ??
            return controller.showTotalResults(req, res);
        })
        .get('/:gameId', (req, res) => {
            return controller.getGame(req, res);
        })
        //    .get('/:gameId/results', (req, res) => { 
        //       return controller.showGameResults(req, res);
        //   })
        
        .post('/:gameId/play', (req, res) => { // if is auth!!!
            return controller.createGameInstance(req, res);
        })
        .get('/:gameId/play/:id', (req, res) => { //if is auth!!!
            return controller.joinGameInstance(req, res);
        });


    app.use('/games', router);
};

module.exports = { attachTo };