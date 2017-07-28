/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    const controller = require('./games.router/controller').init(data);
    app.get('/about', (req, res) => {
        return res.render('about'); 
    });
    app.get('/', (req, res) => {
          return controller.getAllActiveGames(req,res);
       // return res.render('home'); 
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };