/* eslint-disable */
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NAME_REQUIRED = 'Name is required';
const USERNAME_REQUIRED = 'Username is required';
const USERNAME_LENGTH = 'Username length must be between 3 and 30 symbols long';
const PASSWORD_REQUIRED = 'Password is required';
const CONFIRM_PASSWORD_REQUIRED = 'Confirm password is required';
const CONFIRM_PASSWORD_MUST_BE_EQUAL = 'Confirm password must be equal';
const EMAIL_REQUIRED = 'Password is required';
const EMAIL_DOES_NOT_MATCH = 'Email doesnt match the tamplate *****@***.***';
const PASSWORD_DOES_NOT_MATCH = 'Password must contain....';

// eslint-disable-next-line
$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    $.validator.messages.regex
);
$().ready(function () {
    $('#signup-form').validate({
        rules: {
            name: {
                required: true,
            },
            username: {
                required: true,
                minlength: USERNAME_MIN_LENGTH,
                maxlength: USERNAME_MAX_LENGTH,
            },
            email: {
                required: true,
                regex: EMAIL_REGEX,
            },
            password: {
                required: true,
                regex: PASSWORD_REGEX,
            },
            confirm: {
                equalTo: '#password',
            },
        },
        messages: {
            name: {
                required: NAME_REQUIRED,
            },
            username: {
                required: USERNAME_REQUIRED,
                minlength: USERNAME_LENGTH,
                maxlength: USERNAME_LENGTH,
            },
            email: {
                required: EMAIL_REQUIRED,
                regex: EMAIL_REGEX,
            },
            password: {
                required: PASSWORD_REQUIRED,
                regex: PASSWORD_DOES_NOT_MATCH,
            },
            confirm: {
                equalTo: CONFIRM_PASSWORD_MUST_BE_EQUAL,
            },
        },
    });
});
