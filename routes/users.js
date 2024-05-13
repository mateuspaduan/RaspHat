const express = require("express");
const createUser = require("../controllers/authentication/createUser");
const loginUser = require("../controllers/authentication/loginUser");
const authUser = require("../controllers/authentication/authorizationUser");
const logoutUser = require("../controllers/authentication/logoutUser");
const testUser = require("../controllers/authentication/testUser");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/testUser", testUser);
router.get("/protected", authUser);
router.get("/logout", logoutUser);

module.exports = router;