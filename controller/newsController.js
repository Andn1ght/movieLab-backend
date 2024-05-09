const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

// Create a new news article
exports.createNews = async (req, res) => {
    try {
        const { title, body, imageUrl } = req.body;
        const newsRef = await db.collection("news").add({
            title,
            body,
            imageUrl
        });
        res.status(201).json({ message: "News article created successfully", id: newsRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating news article", error });
    }
};

// Get all news articles
exports.getAllNews = async (req, res) => {
    try {
        const snapshot = await db.collection("news").get();
        const newsArticles = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            newsArticles.push({ id: doc.id, ...data });
        });
        res.status(200).json(newsArticles);
    } catch (error) {
        res.status(500).json({ message: "Error getting news articles", error });
    }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsRef = await db.collection("news").doc(id).get();
        if (!newsRef.exists) {
            return res.status(404).json({ message: "News article not found" });
        }
        const newsArticle = newsRef.data();
        res.status(200).json({ id: newsRef.id, ...newsArticle });
    } catch (error) {
        res.status(500).json({ message: "Error getting news article", error });
    }
};

// Update a news article by ID
exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, imageUrl } = req.body;
        await db.collection("news").doc(id).update({
            title,
            body,
            imageUrl
        });
        res.status(200).json({ message: "News article updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating news article", error });
    }
};

// Delete a news article by ID
exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("news").doc(id).delete();
        res.status(200).json({ message: "News article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting news article", error });
    }
};
