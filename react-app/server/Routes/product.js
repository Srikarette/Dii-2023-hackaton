const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../controllers/product");
//http://localhost:5000/api/products
router.get("/products", list);
router.get("/products/:id", read);
router.post("/products", create);
router.put("/products", update);
router.delete("/products", remove);

module.exports = router;
