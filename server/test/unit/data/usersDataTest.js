const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');

describe('UsersData.findByUsername', () => {

    const db = {
        collection: () => { },
    };
    let items = [];
    let data = null;

    const findOne = ({ username }) => {
        return Promise.resolve(items.find((u) => u.username === username ));
    };

    describe('When we give first found User`s name as a searchName', () => {
        beforeEach(() => {
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

            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });

            data = new UsersData(db);
        });

        it('Expect to return the same user', () => {
            const searchedUserName = items[0].username;

            data.findByUsername(searchedUserName)
                .then((foundUser) => {
                    expect(foundUser.name).to.equal(items[0].name);
                });
        });
    });
});
