//Middleware auth.js
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("No token to access");
    }

    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded.user;
    next();

  } catch (err) {
    console.log("Token Verification Error:", err);
    res.status(500).send("Invalided token!");
  }
};
