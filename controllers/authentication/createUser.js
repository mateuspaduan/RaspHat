const bcrypt = require('bcrypt');
const User = require('../../models/user.js')
const createSecretToken = require('../../jwtGeneration.js');

const createUser = async(req, res) => {
    try {
        console.log(req.body.password);
        if (!(req.body.email && req.body.password && req.body.name && req.body.username)) {
            res.status(400).send('All the inputs are required');
        }
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(400).send("User already exists, feel free to login.");
        }
        const rounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, rounds);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });
        const user = await newUser.save();
        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
        });
        console.log('Cookie set with success!');
        res.json(user);
    } catch (error) {
        console.log('Error:', error);
    }
};

module.exports = createUser;
