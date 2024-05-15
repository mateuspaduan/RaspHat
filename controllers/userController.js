const User = require('../models/user.js');
const Account = require('../models/account.js');
const bcrypt = require('bcrypt');
const accountController = require('../controllers/accountController.js');
const createSecretToken = require('../jwtGeneration.js');

const findByEmail = async(email) => {
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        return existingUser;
    }
    return false;
};

const checkIfExistsByEmail = async(email) => {
    const existingUser = await findByEmail(email);
    if (existingUser) {
        return true;
    }
    return false;
};

const create = async(name, email, username, password) => {
    const userExists = await checkIfExistsByEmail(email);
    if (userExists) {
        return false;
    } else {
        const account = await accountController.findByName('IBM');
        if (account) {
            const user;
            // const token;
            const rounds = 10;
            const hashedPassword = bcrypt.hash(password, rounds);
            const newUser = new User({
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                accounts: [account._id],
            });
            user = await newUser.save();
            account.push(user);
            await user.populate('accounts');
            await account.save();
            // Do I need to set a token during user creation?
            // token = createSecretToken(user._id); 
            // return token;
            return true;
        }
    }
    return false;
};

// Should all the edits receive the token as parameter or
// Should I call authenticationController.js?
const editPasswordByEmail = async(email, newPassword) => {
    const userToEdit = await findByEmail(email);
    if (!(userToEdit)) {
        return false;
    } else {
        userToEdit.password = newPassword;
        await userToEdit.save();
    }
    return userToEdit;
};

const editUsernameByEmail = async (email, newUsername) => {
    const userToEdit = await findByEmail(email);
    if (!(userToEdit)) {
        return false;
    } else {
        userToEdit.username = newUsername;
        await userToEdit.save();
    }
    return userToEdit;
};

const deleteByEmail = async (email) => {
    const userToDelete = await findByEmail(email);
    if (!(userToDelete)) {
        return false;
    } else {
        await userToDelete.deleteOne();
    }
    return userToDelete;
};

module.exports = create, 
                 checkIfExistsByEmail,
                 findByEmail,
                 editPasswordByEmail,
                 editUsernameByEmail,
                 deleteByEmail;