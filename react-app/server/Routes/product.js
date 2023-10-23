const express = require("express");
const router = express.Router();

const { read, list, create } = require("../controllers/product");

router.get("/products", list);
router.get("/products/:id", read);
router.post("/products", create);
router.put("/products", (req, res) => {
  res.send("Hello Put Endpoint");
});
router.delete("/products", (req, res) => {
  res.json({
    name: "potter",
    id: 888,
  });
});

module.exports = router;
