const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.router("/user/new").get(createUser);
module.exports = router;
