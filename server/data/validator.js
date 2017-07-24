/*eslint max-len: ["error", 800]*/

const FIRSTNAME_REQUIRED = 'Name is required';
const USERNAME_REQUIRED = 'Username is required';
const USERNAME_LENGTH = 'Username length must be between 3 and 30 symbols long';
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const EMAIL_DOES_NOT_MATCH = 'Email doesnt match the tamplate *****@***.***';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validatePassword(password) {
    let isCorrect = true;
    if (!PASSWORD_REGEX.test(password) || typeof password !== 'string') {
        isCorrect = false;
    }

    return isCorrect;
}

function validateRequiredInfo(input) {
    if (!input) {
        return false;
    }

    return true;
}

function validateNumberType(input) {
    if (input === '0') {
        return true;
    } else if (!Number(input)) {
        return false;
    }

    return true;
}

function validateDateType(input) {
    if (!new Date(input)) {
        return false;
    }

    return true;
}

function validateRegexMatch(input, regex) {
    if (!input.match(regex)) {
        return false;
    }

    return true;
}

function validateBooleanType(input) {
    if (!input === 'true' && !input === 'false') {
        return false;
    }

    return true;
}

function validateLength(input, min, max) {
    if (input.length < min || input.length > max) {
        return false;
    }

    return true;
}

function validateNumberRange(input, min, max) {
    if (input < min || input > max) {
        return false;
    }

    return true;
}

function escapeProhibitedChars(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&quot;')
        .replace(/"/g, '&#039;')
        .replace(/\$/g, '&#36;');
}

function validate(user) {
    return new Promise((resolve, reject) => {
        console.log('-validator |');
        const props = Object.keys(user);
        for (let prop of props) {
            const value = user[prop];
            if (value) {
                user[prop] = escapeProhibitedChars(value);
            }
        }

        if (!validateRequiredInfo(user.username)) {
            console.log('m | -validator |err: user.username: ' + user.username);
            reject(USERNAME_REQUIRED);
        } else if (!validateLength(user.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)) {
            console.log('m | -validator |err: user.username: ' + user.username);
            reject(USERNAME_LENGTH);
        } else if (!validateRegexMatch(user.email, EMAIL_REGEX)) {
            console.log('m | -validator |err: user.email: ' + user.email);
            reject(EMAIL_DOES_NOT_MATCH);
        }
        else {
            console.log('m | -validator | all is good');
        }

        resolve(user);
    });
}

module.exports = {
    validate,
};
