const express = require("express");
const router = express.Router();
const newsController = require("../controller/newsController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Create a new news article
router.post("/", isAuthenticated, newsController.createNews);

// Get all news articles
router.get("/", newsController.getAllNews);

// Get a single news article by ID
router.get("/:id", newsController.getNewsById);

// Update a news article by ID
router.put("/:id", isAuthenticated, newsController.updateNews);

// Delete a news article by ID
router.delete("/:id", isAuthenticated, newsController.deleteNews);

module.exports = router;
