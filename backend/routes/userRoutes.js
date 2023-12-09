const express = require("express");
const { createUser } = require("../controller/userController");
const router = express.Router();
router.route("/user").post(createUser);
// router.router("/user/new").get(createUser);
module.exports = router;
