const express = require("express");
const router = express.Router();

const { list, create, remove } = require("../controllers/travel");
//Middleware
const { auth } = require("../Middleware/auth");

// GET all travel records
router.get("/travel", auth, list);

// POST a new travel record
router.post("/travel", auth, create);

// DELETE a specific travel record by ID
router.delete("/travel/:id", auth, remove);

module.exports = router;
