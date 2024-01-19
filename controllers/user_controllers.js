const user = require("../models/usermodel");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const currentuser = asynchandler(async (req, res) => {
  res.status(200).json(req.user);
});

const registeruser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("all fields are mandatory");
  }
  // user is already registered
  const alreadyuser = await user.findOne({ email });
  if (alreadyuser) {
    res.status(400);
    throw new Error("user already registered");
  }
  // hash the password
  const hashpass = await bcrypt.hash(password, 10);
  // console.log(`hashed password is: ${hashpass}`);

  const userObj = await user.create({
    username,
    email,
    password: hashpass,
  });

  res.status(200).json(userObj);
});

const loginuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("all fields are required");
  }

  const userobj = await user.findOne({ email });
  if (userobj && (await bcrypt.compare(password, userobj.password))) {
    const accesstoken = jwt.sign(
      {
        userobj: {
          username: userobj.username,
          email: userobj.email,
          id: userobj.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.send(401);
    throw new Error("email or password is not valid");
  }
});

module.exports = { currentuser, registeruser, loginuser };
