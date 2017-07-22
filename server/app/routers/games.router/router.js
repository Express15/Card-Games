const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', (req, res) => { // pages
            return controller.getAll(req,res);
        })
        .get('/:gameId', (req, res) => { // ??
            return controller.getGame(req,res);
        });
        //search

    app.use('/games', router);
};

module.exports = { attachTo };