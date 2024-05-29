const Account = require('../models/account.js');

const findByName = async(accountName) => {
    const existingAccount = await Account.findOne({accountName: accountName});
    if (existingAccount) {
        return existingAccount;
    }
    return false;
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

const editPasswordByEmail = async(currentAccountName, newAccountName) => {
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
    if (!(accountToDelete)) {
        return false;
    } else {
        await accountToDelete.deleteOne();
    }
};

module.exports = {
                    create, 
                    checkIfExistsByName,
                    findByName,
                    editPasswordByEmail,
                    deleteByName
                };