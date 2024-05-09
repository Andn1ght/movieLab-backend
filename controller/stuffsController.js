const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

// Create a new stuff
exports.createStuff = async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;
        const stuffRef = await db.collection("stuffs").add({
            name,
            description,
            imageUrl
        });
        res.status(201).json({ message: "Stuff created successfully", id: stuffRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating stuff", error });
    }
};

// Get all stuffs
exports.getAllStuffs = async (req, res) => {
    try {
        const snapshot = await db.collection("stuffs").get();
        const stuffs = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            stuffs.push({ id: doc.id, ...data });
        });
        res.status(200).json(stuffs);
    } catch (error) {
        res.status(500).json({ message: "Error getting stuffs", error });
    }
};

// Get a single stuff by ID
exports.getStuffById = async (req, res) => {
    try {
        const { id } = req.params;
        const stuffRef = await db.collection("stuffs").doc(id).get();
        if (!stuffRef.exists) {
            return res.status(404).json({ message: "Stuff not found" });
        }
        const stuff = stuffRef.data();
        res.status(200).json({ id: stuffRef.id, ...stuff });
    } catch (error) {
        res.status(500).json({ message: "Error getting stuff", error });
    }
};

// Update a stuff by ID
exports.updateStuff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imageUrl } = req.body;
        await db.collection("stuffs").doc(id).update({
            name,
            description,
            imageUrl
        });
        res.status(200).json({ message: "Stuff updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating stuff", error });
    }
};

// Delete a stuff by ID
exports.deleteStuff = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("stuffs").doc(id).delete();
        res.status(200).json({ message: "Stuff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting stuff", error });
    }
};
