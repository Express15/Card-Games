//just copied!!!

const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/sign-up', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/sign-in', (req, res) => {
            return controller.getSignInForm(req, res); 
        })
        .get('/user', (req, res) => {
            return controller.getUserProfile(req, res);
        })
        .post('/sign-out', (req, res) => {
            return controller.signOut(req, res); //get???
        })
        .post('/sign-up', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/sign-in', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-in',
            failureFlash: true,
        }));

    app.use('/auth', router);// something is wrong???
};

module.exports = { attachTo };