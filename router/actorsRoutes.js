const express = require("express");
const router = express.Router();
const actorsController = require("../controller/actorsController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Create a new actor
router.post("/", isAuthenticated, actorsController.createActor);

// Get all actors
router.get("/", actorsController.getAllActors);

// Get a single actor by ID
router.get("/:id", actorsController.getActorById);

// Update an actor by ID
router.put("/:id", isAuthenticated, actorsController.updateActor);

// Delete an actor by ID
router.delete("/:id", isAuthenticated, actorsController.deleteActor);

module.exports = router;
