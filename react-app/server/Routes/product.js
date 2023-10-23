const express = require("express");
const router = express.Router();

router.get("/product", (req, res) => {
  res.send("Hello product");
});

module.exports = router;
