// const { expect } = require('chai');
const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const encriptor = require('../../../utils/encryption');


describe('Encription', () => {
    it('expect to return encripted pass', () => {
        const pass = 'somepass33';
        const key = '';
        const expectedPass = pass + key;
        const actualPass = encriptor.generateHashedPassword(pass);

        expect(actualPass).to.be.equal(expectedPass);
    });
});
