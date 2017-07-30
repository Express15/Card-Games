// const { expect } = require('chai');
const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');

describe('UsersData', () => {
    const db = {
        collection: () => { },
    };
    const items = [{
        name: 'Sasho',
        username: 'SashoUsername',
        email: 'SashoUsername@gmail.com',
        password: 'sashoPass',
        score: 0,
    }, {
        name: 'Gosho',
        username: 'GoshoUsername',
        email: 'GoshoUsername@gmail.com',
        password: 'GoshoPass',
        score: 0,
    }];
    let data = null;

    const findOne = ({ username }) => {
        return Promise.resolve(items.find((u) => u.username === username));
    };

    describe('.findByUsername', () => {
        describe('When we give first found User name as a searchName', () => {
            beforeEach(() => {
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                data = new UsersData(db);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('Expect to return the same user', () => {
                const searchedUserName = items[0].username;

                return data.findByUsername(searchedUserName)
                    .then((foundUser) => {
                        expect(foundUser.name).to.equal(items[0].name);
                    });
            });
            // eslint-disable-next-line
            it('Expect to throw if we compare the result with second found user`s name', () => {
                const searchedUserName = items[0].username;

                return data.findByUsername(searchedUserName)
                    .then((foundUser) => {
                        expect(foundUser.name).not.to.equal(items[1].name);
                    });
            });
        });
    });

    describe('.checkPassword', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        describe('When we give a valid/existing username and pass', () => {
            it('Expect to return existing user', () => {
                const expectedUsername = items[0].username;
                const expectedPassword = items[0].password;
                const expectedName = items[0].name;

                return data.checkPassword(expectedUsername, expectedPassword)
                    .then((foundUser) => {
                        expect(foundUser.name).to.equal(expectedName);
                    });
            });
        });

        describe('When we give a wrong username', () => {
            it('Expect to throw an error "Invalid user"', (done) => {
                const wrongUsername = 'NoSuchUsername';
                const expectedPassword = items[0].password;
                const expectedName = items[0].name;
                // eslint-disable-next-line
                const promise = data.checkPassword(wrongUsername, expectedPassword);

                promise
                    .then(() => {
                    }, (err) => {
                        const msg = err.toString();
                        expect((msg)).to.contain('Invalid user');
                    })
                .then(done, done);

                // return expect(promise).to.eventually.throw('Invalid user');
            });
        });

        describe('When we give a wrong password', () => {
            it('Expect to throw an error "Invalid password"', (done) => {
                const expectedUsername = items[0].username;
                const wrongPassword = 'wrongPass$$$';
                const expectedName = items[0].name;
                // eslint-disable-next-line
                const promise = data.checkPassword(expectedUsername, wrongPassword);

                promise
                    .then(() => {
                    }, (err) => {
                        const msg = err.toString();
                        expect((msg)).to.contain('Invalid password');
                    })
                .then(done, done);
                // eslint-disable-next-line
                // return expect(promise).to.eventually.throw('Invalid password');
            });
        });
    });

    describe('.findById', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });
    });
});
