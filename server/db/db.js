const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


   

const init = (connectionString) => {
   mongoose.Promise = global.Promise;
    return mongoose.connect(connectionString, { useMongoClient: true })
        .then((db) => {
            console.log('Databases connected');
            return db;
        });
};


module.exports = { init };