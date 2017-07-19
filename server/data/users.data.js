//const User = require('../models/user.model');

class UsersData {
    constructor(db) {
        this.db = db;
        this.collection = [{ id: '1', name: 'user1', password: '111' }
            , { id: '2', name: 'user2', password: '222' }
            , { id: '3', name: 'user3', password: '333' }];
    }
    findByUsername(username) {
        return this.collection.find(x => x.name == username);
    }
    createUser(user) {
        if(user.password!==user.confirm-pasword) // fix confirm-password named
        this.collection.push(user);
        return user;
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

                return true;
            });
    }
}

module.exports = UsersData;