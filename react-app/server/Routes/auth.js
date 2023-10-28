const express = require("express");
const router = express.Router();

//http://localhost:5000/api/register
router.get("/register", (req, res) => {
  res.send("Start learn authentication");
});

module.exports = router;
