const express = require("express");
const { register, login, loginLine } = require("../controllers/auth");
const router = express.Router();

//http://localhost:5000/api/register
router.post("/register", register);
router.post("/login", login);
router.post("/loginLine", loginLine);

module.exports = router;
