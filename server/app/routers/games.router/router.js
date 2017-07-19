const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/all', (req, res) => {
            return controller.getAll(req,res);
        })
        .get('/game/:gameId', (req, res) => {
            return controller.getGame(req,res);
        });

    app.use('/games', router);
};

module.exports = { attachTo };