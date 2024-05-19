const express = require("express");
const accountController = require("../controllers/accountController.js");
const accountsRouter = express.Router();

async function create (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.sendStatus(400).send('All the inputs are required!');
    }
    const newAccount = await accountController.create(accountName);
    if (!(newAccount)) {
        res.sendStatus(400).send('An account with that name already exists.');
    }
    res.sendStatus(200).send(`Account ${accountName} created successfully!`);
};

async function findByName(req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.sendStatus(400).send('All the inputs are required!');
    }
    const account = await accountController.findByName(accountName);
    res.sendStatus(200).json({message: account});
};

async function editByName (req, res) {
    const currentAccountName = req.body.currentAccountName;
    const newAccountName = req.body.newAccountName;
    if (!(currentAccountName)) {
        res.sendStatus(400).send('All the inputs are required!');
    }
    const accountToEdit = await accountController.editByName(currentAccountName, newAccountName);
    res.sendStatus(200).json({message: 'Account edited successfully!'});
};

async function deleteByName (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.sendStatus(400).json({message: 'All the inputs are required!'});
    }
    const accountToDelete = await accountController.deleteByName(accountName);
    res.sendStatus(200).json({message: 'Account deleted successfully!'});
};

accountsRouter.post("/", create);
accountsRouter.get("/", findByName);
accountsRouter.put("/", editByName);
accountsRouter.delete("/", deleteByName);

module.exports = accountsRouter;