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
    //1. Check if the user exists
    const { username, password } = req.body;
    var user = await User.findOne({ username });
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!");
      } else {
        //2. Payload to send in response
        var payload = {
          user: {
            username: user.username,
          },
        };

        //3. Generate Token
        jwt.sign(payload, "jwtsecret", (err, token) => {
          if (err) {
            console.error(err);
            res.status(500).send("Server error: " + err.message);
          } else {
            res.json({
              token,
              payload,
            });
          }
        });
      }
    } else {
      return res.status(400).send("User not found!!!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};
