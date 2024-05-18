const express = require("express");
const accountController = require("../controllers/accountController.js");
const accountsRouter = express.Router();

async function createAcc (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required!');
    }
    const newAccount = await accountController.create(accountName);
    if (!(newAccount)) {
        res.status(400).send('An account with that name already exists.');
    }
    res.status(200).send(`Account ${accountName} created successfully!`);
};

async function findByName(req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required!');
    }
    const account = await accountController.findByName(accountName);
    res.send(200).json({message: account});
};

async function editByName (req, res) {
    const currentAccountName = req.body.currentAccountName;
    const newAccountName = req.body.newAccountName;
    if (!(currentAccountName)) {
        res.status(400).send('All the inputs are required!');
    }
    const accountToEdit = await accountController.editByName(currentAccountName, newAccountName);
    res.send(200).json({message: accountToEdit});
};

async function deleteByName (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required!');
    }
    const accountToDelete = await accountController.deleteByName(accountName);
    res.send(200).json({message: accountToDelete});
};

accountsRouter.post("/", createAcc);
accountsRouter.get("/", findByName);
accountsRouter.put("/", editByName);
accountsRouter.delete("/", deleteByName);

module.exports = accountsRouter;