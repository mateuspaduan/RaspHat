const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const accountController = require('../controllers/accountController.js');

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
            const rounds = 10;
            const hashedPassword = await generateHashedPassword(password, rounds);
            const newUser = new User({
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                accounts: [account._id],
            });
            await newUser.save();
            account.users.push(newUser._id, newUser.email);
            await account.save();
            await newUser.populate('accounts');
            return true;
        }
        else {
            return false;
        }
    }
};

const editPasswordByEmail = async(email, newPassword) => {
    const rounds = 10;
    const userToEdit = await findByEmail(email);
    if (!(userToEdit)) {
        return false;
    } else {
        userToEdit.password = await generateHashedPassword(newPassword, rounds);
        await userToEdit.save();
        return userToEdit;
    }
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

const generateHashedPassword = async (password, rounds) => {
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
};

module.exports = { 
                    create, 
                    checkIfExistsByEmail,
                    findByEmail,
                    editPasswordByEmail,
                    generateHashedPassword,
                    deleteByEmail
                };