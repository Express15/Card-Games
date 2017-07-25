/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/about', (req, res) => {
        return res.render('about'); 
    });
    app.get('/', (req, res) => {
        return res.render('home'); // maybe controller to be testable???
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };