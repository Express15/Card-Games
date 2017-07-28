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
        .post('/sign-up', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-up',
            failureFlash: true,
        }))
        .post('/sign-in', passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-in',
            failureFlash: true,
        }))
        .post('/sign-out', (req, res) => {
            return controller.signOut(req, res);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };