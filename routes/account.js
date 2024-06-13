const express = require("express");
const accountController = require("../controllers/accountController.js");
const accountsRouter = express.Router();

async function create(req, res) {
    const accountName = req.body.accountName;
    if (!accountName) {
        return res.status(400).send('All the inputs are required!');
    }
    try {
        const newAccount = await accountController.create(accountName);
        if (newAccount) {
            return res.status(200).json({message: `Account ${accountName} created successfully!`});
        } else {
            return res.status(500).json({message: 'Failed to create account.'});
        }
    } catch (error) {
        return res.status(400).send('An account with that name already exists.');
    }
};

async function findByName(req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required!');
    }
    try {
        const account = await accountController.findByName(accountName);
        if (account) {
            res.status(200).json({message: account});
        } else {
            res.status(404).json({message: 'Account not found.'});
        }
    } catch (error) {
        return res.status(500).json({message: 'An error occurred while looking for the account.'});
    }
};

async function editByName (req, res) {
    const currentAccountName = req.body.currentAccountName;
    const newAccountName = req.body.newAccountName;
    if (!(currentAccountName)) {
        return res.status(400).send('All the inputs are required!');
    }
    try {
        const accountToEdit = await accountController.editByName(currentAccountName, newAccountName);
        if (accountToEdit) {
            return res.status(200).json({message: 'Account edited successfully!'});
        } else {
            return res.status(404).json({message: 'There is no account to be edited!'});
        }
    } catch (error) {
        return res.status(500).json({message: 'An error occurred while editing the account.'});
    }
};

async function deleteByName (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        return res.status(400).json({message: 'All the inputs are required!'});
    }
    try {
        const accountToDelete = await accountController.deleteByName(accountName);
        if (accountToDelete) {
            return res.status(200).json({message: 'Account deleted successfully!'});
        } else {
            return res.status(404).json({message: 'There is not account to be deleted!'});
        }
    } catch (error) {
        return res.status(500).json({message: 'An error occurred while deleting the account.'});
    }
};

accountsRouter.post("/", create);
accountsRouter.get("/", findByName);
accountsRouter.put("/", editByName);
accountsRouter.delete("/", deleteByName);

module.exports = accountsRouter;