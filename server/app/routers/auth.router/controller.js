class UserController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    getUserProfile(req, res) {
        return res.render('auth/user');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;
      
        //    .then((dbUser) => {
        const dbUser = this.data.users.findByUsername(bodyUser.username);
        if (dbUser) {
            throw new Error('User already exists');
        }

        return Promise.resolve(this.data.users.createUser(bodyUser))
            //    })
            .then((dbUser) => {
                return res.redirect('/auth/sign-in'); //???
            })
            .catch((err) => {
                req.flash('error', err);
            });
    }
}

const init = (data) => {
    return new UserController(data);
};

module.exports = { init };