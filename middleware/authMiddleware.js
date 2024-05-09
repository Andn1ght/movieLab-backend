const firebase = require("firebase");
require("firebase/auth");

// Initialize Firebase
firebase.initializeApp(require("../config/firebaseConfig"));

// Middleware function to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
    const user = firebase.auth().currentUser;
    if (user) {
        // User is authenticated
        req.user = user; // Set user object in request for further processing
        next(); // Proceed to the next middleware or route handler
    } else {
        // User is not authenticated
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }
};
