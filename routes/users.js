const express = require("express");
const createUser = require("../controllers/authentication/createUser");
const loginUser = require("../controllers/authentication/loginUser");
const testUser = require("../controllers/authentication/testUser");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/testUser", testUser);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;