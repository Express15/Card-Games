const port = process.env.PORT || 3000;
const connectionString = "mongodb://localhost/game"// TODO: Change the name
const sessionSecret = 'keyboard cat';

module.exports = { port, connectionString ,sessionSecret}; 