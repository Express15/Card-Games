const { ObjectID } = require('mongodb');

class UsersData {
    constructor(db) {
        this.users = db.collection('users');
    }

    findByUsername(username) {
        return this.users.findOne({ username });
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }
                return user;
            });
    }

    findById(id) {
        return this.users.findOne({
            _id: new ObjectID(id),
        });
    }

    createUser(bodyUser) {
        return this.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return new Promise((resolve) => {
                    const newUser = {
                        name: bodyUser.name,
                        username: bodyUser.username,
                        email: bodyUser.email,
                        password: bodyUser.password, // hash password
                        score: 0,
                    };

                    resolve(newUser);
                });
            })
            .then((newUser) => {
                return this.users.insert(newUser)
                    .then((result) => {
                        return result.ops[0];
                    });
            });
    }

    saveResults(username, score) { // for multi players - array of objects
        return this.users.update({ username: username }, {
            $inc: {
                score: score,
            },
        })
            .then((result) => {
                return Promise.resolve(result);
            });
    }

    getResults() {
        return this.users.find({}, { username: 1, score: 1 }).toArray()
            .then((scores) => {
                return scores.sort((a, b) => b.score - a.score).slice(0, 10);
            });
    }
}

module.exports = UsersData;
