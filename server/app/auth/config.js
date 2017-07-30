const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const config = require('../../config');

const applyTo = (app, data) => {
    const signinStrategy = new Strategy((username, password, done) => {
        data.users.checkPassword(username, password)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });

    const signupStrategy = new Strategy({// 'login-signup' is optional here   
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true },
        (req, username, password, done) => {
            console.log('############# req= ' + JSON.stringify(req.body)); 
            console.log('############# req= end');
            data.users.createUser(req.body)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
    });

    passport.use('local-signin', signinStrategy);
    passport.use('local-signup', signupStrategy);
    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };