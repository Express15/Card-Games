const { expect } = require('chai');
const sinon = require('sinon');

const myDB = require('../../../db/');

describe('Database', () => {
    // eslint-disable-next-line
    it('should have "collection" as a function after connecting (dont forget to start mongod) ', (done) => {
        myDB.init('mongodb://localhost/game').then((database) => {
            const result = typeof(database.collection) + '';
            expect(result).to.be.equal('function');
        })
        .then(done, done);
    });
});
