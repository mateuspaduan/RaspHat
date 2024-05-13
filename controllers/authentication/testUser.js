const env = require('dotenv');

env.config();

const testUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = req.cookies.token;
    if (token === null) {
       return res.send('Token is null!');
    } else if (token === '') {
        return res.send('Token is empty!');
    }
    return res.json({token});
}

module.exports = testUser;