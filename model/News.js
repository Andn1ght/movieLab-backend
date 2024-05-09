const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

class News {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static async getAll() {
        try {
            const snapshot = await db.collection("news").get();
            const newsArticles = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                newsArticles.push({ id: doc.id, ...data });
            });
            return newsArticles;
        } catch (error) {
            throw new Error("Error fetching news articles");
        }
    }

    static async getById(id) {
        try {
            const doc = await db.collection("news").doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return { id: doc.id, ...data };
        } catch (error) {
            throw new Error("Error fetching news article");
        }
    }

    async save() {
        try {
            const docRef = await db.collection("news").add({
                title: this.title,
                content: this.content
            });
            return docRef.id;
        } catch (error) {
            throw new Error("Error saving news article");
        }
    }

    async update(id) {
        try {
            await db.collection("news").doc(id).update({
                title: this.title,
                content: this.content
            });
        } catch (error) {
            throw new Error("Error updating news article");
        }
    }

    static async delete(id) {
        try {
            await db.collection("news").doc(id).delete();
        } catch (error) {
            throw new Error("Error deleting news article");
        }
    }
}

module.exports = News;
