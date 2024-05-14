const express = require("express");
const createUser = require("../controllers/user/authentication/createUser");
const loginUser = require("../controllers/user/authentication/loginUser");
const authUser = require("../controllers/user/authentication/authorizationUser");
const logoutUser = require("../controllers/user/authentication/logoutUser");
const testUser = require("../controllers/user/authentication/testUser");
const usersRouter = express.Router();

usersRouter.post("/signup", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/testUser", testUser);
usersRouter.get("/protected", authUser);
usersRouter.get("/logout", logoutUser);

module.exports = usersRouter;