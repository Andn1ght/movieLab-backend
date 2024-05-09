const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

// Create a new actor
exports.createActor = async (req, res) => {
    try {
        const { name, characterName, bio, imageUrl } = req.body;
        const actorRef = await db.collection("actors").add({
            name,
            characterName,
            bio,
            imageUrl
        });
        res.status(201).json({ message: "Actor created successfully", id: actorRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating actor", error });
    }
};

// Get all actors
exports.getAllActors = async (req, res) => {
    try {
        const snapshot = await db.collection("actors").get();
        const actors = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            actors.push({ id: doc.id, ...data });
        });
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Error getting actors", error });
    }
};

// Get a single actor by ID
exports.getActorById = async (req, res) => {
    try {
        const { id } = req.params;
        const actorRef = await db.collection("actors").doc(id).get();
        if (!actorRef.exists) {
            return res.status(404).json({ message: "Actor not found" });
        }
        const actor = actorRef.data();
        res.status(200).json({ id: actorRef.id, ...actor });
    } catch (error) {
        res.status(500).json({ message: "Error getting actor", error });
    }
};

// Update an actor by ID
exports.updateActor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, characterName, bio, imageUrl } = req.body;
        await db.collection("actors").doc(id).update({
            name,
            characterName,
            bio,
            imageUrl
        });
        res.status(200).json({ message: "Actor updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating actor", error });
    }
};

// Delete an actor by ID
exports.deleteActor = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("actors").doc(id).delete();
        res.status(200).json({ message: "Actor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting actor", error });
    }
};
