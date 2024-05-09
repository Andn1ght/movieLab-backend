const express = require("express");
const router = express.Router();
const stuffsController = require("../controller/stuffsController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Create a new stuff
router.post("/", isAuthenticated, stuffsController.createStuff);

// Get all stuffs
router.get("/", stuffsController.getAllStuffs);

// Get a single stuff by ID
router.get("/:id", stuffsController.getStuffById);

// Update a stuff by ID
router.put("/:id", isAuthenticated, stuffsController.updateStuff);

// Delete a stuff by ID
router.delete("/:id", isAuthenticated, stuffsController.deleteStuff);

module.exports = router;
