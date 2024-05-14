const express = require("express");
const createAccount = require("../controllers/account/createAccount");
const accountsRouter = express.Router();

accountsRouter.post("/signup", createAccount);

module.exports = accountsRouter;