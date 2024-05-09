const express = require("express");
const router = express.Router();
const eventsController = require("../controller/eventsController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Create a new event
router.post("/", isAuthenticated, eventsController.createEvent);

// Get all events
router.get("/", eventsController.getAllEvents);

// Get a single event by ID
router.get("/:id", eventsController.getEventById);

// Update an event by ID
router.put("/:id", isAuthenticated, eventsController.updateEvent);

// Delete an event by ID
router.delete("/:id", isAuthenticated, eventsController.deleteEvent);

module.exports = router;
