require("firebase/auth");
const firebaseConfig = require("../config/firebaseConfig");
const firebase = require("firebase");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Register a new user
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Logout user
exports.logout = async (req, res) => {
    try {
        await firebase.auth().signOut();
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error });
    }
};
