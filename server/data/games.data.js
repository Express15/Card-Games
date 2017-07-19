//const Game = require('../models/game.model');

class GamesData{
    constructor(db) {
       this.db=db;
       this.collection=[{id:'1',name:'game1'},{id:'2',name:'game2'},{id:'3',name:'game3'}];
    }
    getAll(){
        return this.collection;
    }
    getGame(id){
        return this.collection.find(g=>g.id==id);
    }
}

module.exports = GamesData;