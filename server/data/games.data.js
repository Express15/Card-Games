const Game = require('../models/game.model');
const BaseData = require('./base.data');

class GamesData extends BaseData {
    constructor(db) {
        super(db, Game);
    }

    getGame(index) {
        return this.collection.find((g, i) => i == index); //?
    }


}

module.exports = GamesData;