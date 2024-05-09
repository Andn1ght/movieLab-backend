const express = require("express");
const router = express.Router();
const commentsController = require("../controller/commentsController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Create a new comment
router.post("/", isAuthenticated, commentsController.createComment);

// Get all comments for a resource
router.get("/:resourceId", commentsController.getAllCommentsByResource);

// Get a single comment by ID
router.get("/:id", commentsController.getCommentById);

// Update a comment by ID
router.put("/:id", isAuthenticated, commentsController.updateComment);

// Delete a comment by ID
router.delete("/:id", isAuthenticated, commentsController.deleteComment);

module.exports = router;
