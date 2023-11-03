const express = require("express");
const router = express.Router();

const { list, create, remove, read } = require("../controllers/travel");
//Middleware
//const { auth } = require("../Middleware/auth");

// GET all travel records
router.get("/travel", list);

//Get by Id
router.get("/travel/:id", read);

// POST a new travel record
router.post("/travel", create);

// DELETE a specific travel record by ID
router.delete("/travel/:id", remove);

module.exports = router;
