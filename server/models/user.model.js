const modelCreator = require('./utils/model-creator');
const encryption = require("../utils/encryption");

module.exports = modelCreator.register('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    eMail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    playedGames: [{ type: Object }]
});
