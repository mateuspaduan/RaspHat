const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

async function create (req, res) {

};

async function findByUsername(req, res) {

};

async function editByUsername (req, res) {

};

async function deleteByUsername (req, res) {

};

userRouter.post("/", create);
userRouter.get("/", findByUsername);
userRouter.put("/", editByUsername);
userRouter.delete("/", deleteByUsername);

module.exports = userRouter;