const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const createSecretToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};

module.exports = createSecretToken;