const { expect } = require('chai');
const sinon = require('sinon');
const BaseData = require('../../../data/games.data');

describe('games.data.getAll', () => {
    // has to be adapted to games.data.js 
    // to many things have changed
    // waiting for final / close to final version of the 'games.data.js'

    // describe('when there are items in db', () => {
    //     const db = {
    //         collection: () => { },
    //     };
    //     let items = [];
    //     let ModelClass = null;
    //     let data = null;

    //     const toArray = () => {
    //         return Promise.resolve(items);
    //     };

    //     const find = () => {
    //         return {
    //             toArray,
    //         };
    //     };

    //     beforeEach(() => {
    //         items = [1, 2, 3, 4];
    //         sinon.stub(db, 'collection')
    //             .callsFake(() => {
    //                 return { find };
    //             });

    //         ModelClass = class {
    //         };
    //         data = new BaseData(db);
    //     });

    //     afterEach(() => {
    //         db.collection.restore();
    //     });

    //     describe('with default toViewModel', () => {
    //         it('expect to return items', () => {
    //             return data.getAll()
    //                 .then((models) => {
    //                     expect(models).to.deep.equal(items);
    //                 });
    //         });
    //     });

    //     describe('with custom toViewModel', () => {
    //         beforeEach(() => {
    //             ModelClass.toViewModel = (model) => {
    //                     return model + '1';
    //             };
    //         });

    //         it('expect to return items', () => {
    //             return data.getAll()
    //                 .then((models) => {
    //                     items.forEach((item) => {
    //                         const viewModel = item + '1';
    //                         expect(models).to.contain(viewModel);
    //                     });
    //                 });
    //         });
    //     });
    // });
});
