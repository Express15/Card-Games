const User = require('../models/user.model');
const { ObjectID } = require('mongodb');

class UsersData {
    constructor(db) {
        this.db = db;
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
        let newUser = new User({
            username: user.username,
            eMail: user.email,
            password: user.password
        });

        return Promise.resolve(this.collection.insert(newUser));
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
}

module.exports = UsersData;