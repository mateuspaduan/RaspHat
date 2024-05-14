const Account = require('../../models/account.js');

const createAccount = async(req, res) => {
    try {
        if (!(req.body.accountName)) {
            res.status(400).send('All the inputs are required');
        }
        const existingAccount = await Account.findOne({accountName: req.body.accountName});
        if (existingAccount) {
            return res.status(400).send("Account already exists!");
        }
        const newAccount = new Account({
            accountName: req.body.accountName,
            users: [],
        });
        const account = await newAccount.save();
        res.json(account);
    } catch (error) {
        console.log('Error:', error);
    }
};

module.exports = createAccount;
