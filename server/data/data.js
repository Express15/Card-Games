const GamesData = require('./games.data');
//const CategoriesData = require('./categories.data');
//const TodosData = require('./todos.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({ //??? is it nesseccery
        games: new GamesData(db),
        // todos: new TodosData(db),
        // categories: new CategoriesData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };