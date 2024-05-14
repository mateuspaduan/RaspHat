const express = require("express");
const accountController = require("../controllers/account/accountController");
const accountsRouter = express.Router();

accountsRouter.get("/", findByName);
accountsRouter.post("/", create);
accountsRouter.put("/", editByName);
accountsRouter.delete("/", deleteByName);

const create = async(req, res) => {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
    const newAccount = await accountController.createAccount(accountName);
    if (!(newAccount)) {
        res.status(400).send('An account with that name already exists.');
    }
    res.status(200).send(`Account ${accountName} created successfully!`);
};

const findByName = async(req, res) => {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
};

const editByName = async(req, res) => {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
};

const deleteByName = async(req, res) => {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
};

module.exports = accountsRouter;