const express = require("express");
const router = express.Router();
const {
  currentuser,
  loginuser,
  registeruser,
} = require("../controllers/user_controllers");
const validateToken = require("../middleware/accessverification");

router.route("/current").get(validateToken, currentuser);
router.route("/register").post(registeruser);
router.route("/login").post(loginuser);

module.exports = router;
