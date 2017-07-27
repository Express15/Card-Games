const User = require('../models/user.model');
const { ObjectID } = require('mongodb');
const userValidator = require('./validator');

class UsersData {
    constructor(db) {
        this.collection = db.collection('users');
    }
    findByUsername(username) {
        return this.collection.findOne({ username });
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
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    createUser(user) {      
        return userValidator.validate(user)
            .then(() => {
                return new Promise((resolve) => {
                    let newUser = {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                    };
                    
                    resolve(newUser);
                });
            })
            .then((newUser) => {
                return this.collection.insert(newUser);
            });
        // let newUser = new User({
        //     username: user.username,
        //     eMail: user.email,
        //     password: user.password
        // });

        // return Promise.resolve(this.collection.insert(newUser));
        //     if (user.password !== user.confirm) // fix confirm-password named
        //         this.collection.push(user);
        //    return user;
        // }
        // checkPassword(username, password) {
        //     return this.findByUsername(username)
        //        .then((user) => {
        //             if (!user) {
        //                 throw new Error('Invalid user');
        //             }
        //
        //             if (user.password !== password) {
        //                 throw new Error('Invalid password');
        //             }

        //            return true;
        //});
    }

    getResults() {
        // return this.collection.find({}, { username:1, totalScore:1 }).toArray()
        //     .then((scores) => {
        //         return scores.sort((a, b) => b.score - a.score).slice(0, 10);
        //     })

    }
}

module.exports = UsersData;