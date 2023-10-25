const express = require("express");
const router = express.Router();

const { list, create } = require("../controllers/travel");
//http://localhost:5000/api/travel
router.get("/travel", list);
router.post("/travel", create);

module.exports = router;
