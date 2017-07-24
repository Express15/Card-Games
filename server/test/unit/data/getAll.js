const { expect } = require('chai');
const sinon = require('sinon');
const BaseData = require('../../../data/base.data');

describe('BaseData.getAll', () => {
    describe('when there are items in db', () => {
        const db = {
            collection: () => { },
        };
        let items = [];
        let ModelClass = null;
        const validator = null;
        let data = null;

        const toArray = () => {
            return Promise.resolve(items);
        };

        const find = () => {
            return {
                toArray,
            };
        };

        beforeEach(() => {
            items = [1, 2, 3, 4];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };
            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        describe('with default toViewModel', () => {
            it('expect to return items', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                    });
            });
        });

        describe('with custom toViewModel', () => {
            beforeEach(() => {
                ModelClass.toViewModel = (model) => {
                        return model + '1';
                };
            });

            it('expect to return items', () => {
                return data.getAll()
                    .then((models) => {
                        items.forEach((item) => {
                            const viewModel = item + '1';
                            expect(models).to.contain(viewModel);
                        });
                    });
            });
        });
    });
});
