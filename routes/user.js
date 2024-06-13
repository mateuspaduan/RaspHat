const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

async function create (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!(name && email && username && password)) {
        return res.status(400).send('All the inputs are required');
    }
    try {
        const newUser = await userController.create(name, email, username, password);
        if (!newUser) {
            return res.status(400).json({mesage: 'An use with that email is already registered'});
        }
        return res.status(200).json({message: `User ${username} created successfully!`});
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
};

async function findByEmail(req, res) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'All the inputs are required!' });
    }
    try {
        const userToFind = await userController.findByEmail(email);
        return res.status(200).json({ user: userToFind });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while getting user information' });
    }
};

async function editPasswordByEmail (req, res) {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    if ((!email) || (!newPassword)) {
        return res.status(400).json({ message: 'All the inputs are required!' });
    }
    try {
        const userToEdit = await userController.editPasswordByEmail(email, newPassword);
        return res.status(200).json({message: 'User updated successfully!'});
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while editing the user.' });
    }
};

async function deleteByEmail (req, res) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({message: 'All the inputs are required!'});
    }
    try {
        const userToDelete = await userController.deleteByEmail(email);
        return res.status(200).json({message: 'User deleted successfully!'});
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

userRouter.post("/", create);
userRouter.get("/", findByEmail);
userRouter.put("/", editPasswordByEmail);
userRouter.delete("/", deleteByEmail);

module.exports = userRouter;