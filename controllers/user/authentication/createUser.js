const bcrypt = require('bcrypt');
const User = require('../../../models/user.js');
const Account = require('../../../models/account.js');
const createSecretToken = require('../../../jwtGeneration.js');

const createUser = async(req, res) => {
    try {
        if (!(req.body.email && req.body.password && req.body.name && req.body.username)) {
            res.status(400).send('All inputs are required');
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("User already exists, feel free to login.");
        }
        const ibmAccount = await Account.findOne({ accountName: 'IBM' });
        if (!ibmAccount) {
            return res.status(404).send("Account not found.");
        }
        const rounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, rounds);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            accounts: [ibmAccount._id]
        });
        const user = await newUser.save();
        ibmAccount.users.push(user._id);
        await ibmAccount.save();
        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
        });
        console.log('Cookie set with success!');
        await user.populate('accounts');
        res.json(user);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Server error');
    }
};

module.exports = createUser;