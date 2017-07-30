const { expect } = require('chai');
const sinon = require('sinon');

const myDB = require('../../../db/');
const myApp = require('../../../app/');

describe('App', () => {
    it('should (dont forget to start mongod) ', (done) => {
        myDB.init('mongodb://localhost/game').then((database) => {
            myApp.init(myDB)
            .then((app) => {
                const result = app.listen + '';
                expect(result).to.be.equal('function');
            });
        })
        .then(done, done);
    });
});
