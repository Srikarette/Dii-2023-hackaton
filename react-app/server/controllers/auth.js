// Controller = auth.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1. Check if the user is in the database
    const { username, password } = req.body;

    var user = await User.findOne({ username }); // const can't edit value
    console.log(user);
    if (user) {
      return res.send("User already exists!!!").status(400);
    }

    // 2. Encrypt password (you need to implement this)
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    user = new User({
      username,
      password,
    });
    console.log(user.password);
    user.password = await bcrypt.hash(password, salt); //Prepare password

    // 3. Save the user (you need to implement this)
    await user.save();
    res.send("Register successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};

exports.login = async (req, res) => {
  try {
    // Implement the login logic here
    //1. Check User
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate() //2. Payload

      //3. Generate Token

      .res.send("Hello Login Controller");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};
