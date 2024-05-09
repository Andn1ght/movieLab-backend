const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text, author } = req.body;
        const commentRef = await db.collection("comments").add({
            text,
            author
        });
        res.status(201).json({ message: "Comment created successfully", id: commentRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error });
    }
};

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const snapshot = await db.collection("comments").get();
        const comments = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({ id: doc.id, ...data });
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error getting comments", error });
    }
};

// Get all comments for a resource
exports.getAllCommentsByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const snapshot = await db.collection("comments").where("author", "==", author).get();
        const comments = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({ id: doc.id, ...data });
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error getting comments", error });
    }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const commentRef = await db.collection("comments").doc(id).get();
        if (!commentRef.exists) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const comment = commentRef.data();
        res.status(200).json({ id: commentRef.id, ...comment });
    } catch (error) {
        res.status(500).json({ message: "Error getting comment", error });
    }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        await db.collection("comments").doc(id).update({ text });
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment", error });
    }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("comments").doc(id).delete();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
};
