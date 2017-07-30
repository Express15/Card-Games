const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            // eslint-disable-next-line
            console.log('Databases connected');
            return db;
        });
};

module.exports = { init };
