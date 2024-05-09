// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Logout user
router.post("/logout", isAuthenticated, authController.logout);

module.exports = router;
