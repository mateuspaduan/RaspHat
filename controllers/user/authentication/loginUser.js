const bcrypt = require('bcrypt');
const User = require('../../../models/user.js');
const createSecretToken = require('../../../jwtGeneration.js');
const env = require('dotenv');

env.config();

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
        res.status(400).send('All the inputs are required!');
    }
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
        return res.status(404).json({ message: "User not found, or credentials are invalid!" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        domain: process.env.FRONTEND_URL, // Set your domain here
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
    });//}).status(200).json({message: "Logged in successfully!"});
    res.json({token});
};

module.exports = loginUser;
