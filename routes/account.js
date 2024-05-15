const express = require("express");
const accountController = require("../controllers/accountController");
const accountsRouter = express.Router();

async function create (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
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
        res.status(400).send('All the inputs are required');
    }
};

async function editByName (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
};

async function deleteByName (req, res) {
    const accountName = req.body.accountName;
    if (!(accountName)) {
        res.status(400).send('All the inputs are required');
    }
};

accountsRouter.post("/", create);
accountsRouter.get("/", findByName);
accountsRouter.put("/", editByName);
accountsRouter.delete("/", deleteByName);

module.exports = accountsRouter;