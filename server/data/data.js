const GamesData = require('./games.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        games: new GamesData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
