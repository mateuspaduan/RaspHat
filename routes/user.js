const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

async function create (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.username;
    if (!(name && email && username && password)) {
        res.status(400).send('All the inputs are required');
    }
    const newUser = await userController.create(name, email, username, password);
    if (!(newUser)) {
        res.status(400).send('An use with that email is already registered');
    }
    res.status(200).send(`User ${username} created successfully!`);
};

async function findByEmail(req, res) {

};

async function editByEmail (req, res) {

};

async function deleteByUsername (req, res) {

};

userRouter.post("/", create);
userRouter.get("/", findByUsername);
userRouter.put("/", editByUsername);
userRouter.delete("/", deleteByUsername);

module.exports = userRouter;