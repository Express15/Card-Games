const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { validate } = require('../../../data/validator');

describe('validator', () => {
    describe('validateRequiredInfo', () => {
        it('expect to be rejected when Username is not provided', () => {
            const user = {
                username: '',
                email: '',
                password: '',
            };

            expect(validate(user)).to.be.rejectedWith('Username is required');
        });

        it('expect NOT to be rejected when Username is valid', () => {
            const user = {
                username: 'somename',
                email: '',
                password: '',
            };

            expect(validate(user)).not.to.be.rejectedWith('Username is required');
        });
    });
    
    
    describe('validateLength', () => {
        it('expect to be rejected when Username is with length less then 3', () => {
            const user = {
                username: 'so',
                email: '',
                password: '',
            };

            expect(validate(user)).to.be.rejectedWith('Username length must be between 3 and 30 symbols long');
        });

        it('expect to be rejected when Username is with length more then 30', () => {
            const user = {
                username: '1234567890123456789012345678901234567890',
                email: '',
                password: '',
            };

            expect(validate(user)).to.be.rejectedWith('Username length must be between 3 and 30 symbols long');
        });
        
        it('expect NOT to be rejected when Username is with proper length', () => {
            const user = {
                username: 'somename',
                email: '',
                password: '',
            };

            expect(validate(user)).not.to.be.rejectedWith('Username length must be between 3 and 30 symbols long');
        });
    });

     describe('validateRegexMatch', () => {
        it('expect to be rejected when email doesnt match a certain valid pattern', () => {
            const user = {
                username: 'someuser',
                email: 'nonvalidemail@',
                password: '',
            };

            expect(validate(user)).to.be.rejectedWith('Email doesnt match the tamplate *****@***.***');
        });

        it('expect NOT to be rejected when email matches a certain valid pattern', () => {
            const user = {
                username: 'someuser',
                email: 'valid@email.com',
                password: '',
            };

            expect(validate(user)).not.to.be.rejectedWith('email doesnt match the tamplate *****@***.***');
        });
    });
});
