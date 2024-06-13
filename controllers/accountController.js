const Account = require('../models/account.js');

const findByName = async (accountName) => {
    try {
        const existingAccount = await Account.findOne({ accountName: accountName });
        if (existingAccount) {
            return existingAccount;
        }
        return false;
    } catch (error) {
        console.error('Error finding account:', error);
        return false;
    }
};

const checkIfExistsByName = async(accountName) => {
    const existingAccount = await findByName(accountName);
    if (existingAccount) {
        return true;
    }
    return false;
};

const create = async(accountName) => {
    const accountExists = await checkIfExistsByName(accountName);
    if (accountExists) {
        return false;
    } else {
        const newAccount = new Account ({
            accountName: accountName,
            users: [],
        });
        await newAccount.save();
    }
    return true;
};

const editByName = async(currentAccountName, newAccountName) => {
    const accountToEdit = await findByName(currentAccountName);
    if (!(accountToEdit)) {
        return false;
    } else {
        accountToEdit.accountName = newAccountName;
        await accountToEdit.save();
    }
    return accountToEdit;
};

const deleteByName = async (accountName) => {
    const accountToDelete = await findByName(accountName);
    if (accountToDelete) {
        await Account.deleteOne({_id: accountToDelete._id});
        return true;
    } else {
        return accountToDelete;
    }
};

module.exports = {
                    create, 
                    checkIfExistsByName,
                    findByName,
                    editByName,
                    deleteByName
                };