/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
   
    app
        .get('/', (req, res) => {
            return controller.getAllActiveGames(req, res);
        })
        .get('/about', (req, res) => {
            return res.render('about');
        })
        .get('/statistics', (req, res) => {
            return controller.getTotalResults(req, res);
        });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };