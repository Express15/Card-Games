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
    let items = null;

    beforeEach(() => {
        items = [{
            name: 'Sasho',
            username: 'SashoUsername',
            email: 'SashoUsername@gmail.com',
            password: 'sashoPass',
            score: 0,
            _id: '597e081bfd12691f0874a9d8',
        }, {
            name: 'Gosho',
            username: 'GoshoUsername',
            email: 'GoshoUsername@gmail.com',
            password: 'GoshoPass',
            score: 0,
            _id: '999e081bfd12691f0874a9d8',
        }];
    });

    afterEach(() => {
        items = [{
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
    });

    let data = null;

    let findOne = ({ username }) => {
        return Promise.resolve(items.find((u) => u.username === username));
    };

    const toArray = () => {
        return Promise.resolve(items)
            .then((scores) => {
                     // eslint-disable-next-line
                    return scores.sort((a, b) => b.score - a.score).slice(0, 10);
                });
    };

    const find = () => {
        return {
            toArray,
        };
    };

    const update = ({ username }, { $inc }) => {
        return Promise
            .resolve(items.find((u) => u.username === username))
            .then((user) => {
                user.score = $inc.score;
            });
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

    describe('.saveResults', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { update };
                });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('Expect to update user score', () => {
                const expectedUsername = items[0].username;
                const expectedNewScore = 55;

                return data.saveResults(expectedUsername, expectedNewScore)
                    .then(() => {
                        expect(items[0].score).to.equal(expectedNewScore);
                    });
            });
    });

    describe('.getResults', () => {
        beforeEach(() => {
            items = [{
                name: 'Sasho_1',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 1,
            }, {
                name: 'Sasho_2',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 999,
            }, {
                name: 'Sasho_3',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 55,
            }, {
                name: 'Sasho_4',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 0,
            }, {
                name: 'Sasho_5',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 1,
            }, {
                name: 'Sasho_6',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 6,
            }, {
                name: 'Sasho_7',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 77,
            }, {
                name: 'Sasho_8',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 18,
            }, {
                name: 'Sasho_9',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 1,
            }, {
                name: 'Sasho_999',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: -111,
            }, {
                name: 'Sasho_11',
                username: 'SashoUsername',
                email: 'SashoUsername@gmail.com',
                password: 'sashoPass',
                score: 1,
            }];

            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return l0 elements when users are 11', () => {
            return data.getResults()
                .then((sortedAndFoundUsers) => {
                    expect(sortedAndFoundUsers.length).to.equal(10);
                });
        });

        it('to not return user with smallest score', () => {
            const unwantedUserName = 'Sasho_999';
            return data.getResults()
                .then((sortedAndFoundUsers) => {
                    sortedAndFoundUsers.forEach((u) => {
                            expect(u.name).not.to.be.equal(unwantedUserName);
                        });
                });
        });

        it('to return user with biggest score', () => {
            const unwantedUserName = 'Sasho_2';
            return data.getResults()
                .then((sortedAndFoundUsers) => {
                    let foundPlayerWithBiggestScore = false;

                    sortedAndFoundUsers.forEach((u) => {
                        if (u.name === unwantedUserName) {
                            foundPlayerWithBiggestScore = true;
                        }
                    });

                    // eslint-disable-next-line
                    expect(foundPlayerWithBiggestScore).to.be.true;
                });
        });
    });

    describe('.createUser', () => {
        const user = {};

        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('should throw error if user already exists', (done) => {
            data = new UsersData(db);
            user.body = items[0];
            const promise = data.createUser(user.body);

            promise
                .then(() => {
                }, (err) => {
                    const msg = err.toString();
                    expect((msg)).to.contain('User already exists');
                })
            .then(done, done);
        });

        //  it.skip('should create new user', (done) => {
        //     const insert = (...args) => {
        //         return Promise.resolve();
        //     };

        //     sinon.stub(db, 'collection')
        //         .callsFake(() => {
        //             return { insert };
        //         });


        //      user.body = {
        //          'name': 'fofofofoo',
        //          'username': 'fofofofooUsername',
        //          'email': 'fofofofoo2@gmail.com',
        //          'password': 'a24826233',
        //          'confirm': 'a24826233',
        //     };
        //     const promise = data.createUser(user.body);

        //     expect(false).to.be.true;
        // });
    });

    describe('.findById', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });

            findOne = ({ _id }) => {
                return Promise.resolve(items.find((u) => {
                    return u._id+'' === _id+'';
                }));
            };

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('Expect to return the same user', () => {
            const searchedId = items[0]._id;

            return data.findById(searchedId)
                .then((foundUser) => {
                    expect(foundUser.name).to.equal(items[0].name);
                });
        });
    });
});
