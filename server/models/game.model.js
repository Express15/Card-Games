class Game {
    constructor(id, name, rules, deck) {
        this.gameId = id;
        this.name = name;
        this.rules = rules;
        this.deck = deck;
        this.players = [];//{user,score}
    }

}

module.exports = Game;


//cardsCount=98;
//openCards='1,100,1,100';
