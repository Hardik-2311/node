const express = require("express");
const router = express.Router();
const {
  currentuser,
  loginuser,
  registeruser,
} = require("../controllers/user_controllers");

router.route("/current").get(currentuser);
router.route("/register").post(registeruser);
router.route("/login").post(loginuser);

module.exports = router;
