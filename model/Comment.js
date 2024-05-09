const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

class Comment {
    constructor(text, author) {
        this.text = text;
        this.author = author;
    }

    static async getAllByResource(resourceId) {
        try {
            const snapshot = await db.collection("comments").where("resourceId", "==", resourceId).get();
            const comments = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                comments.push({ id: doc.id, ...data });
            });
            return comments;
        } catch (error) {
            throw new Error("Error fetching comments");
        }
    }

    static async getById(id) {
        try {
            const doc = await db.collection("comments").doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return { id: doc.id, ...data };
        } catch (error) {
            throw new Error("Error fetching comment");
        }
    }

    async save() {
        try {
            const docRef = await db.collection("comments").add({
                resourceId: this.resourceId,
                content: this.content
            });
            return docRef.id;
        } catch (error) {
            throw new Error("Error saving comment");
        }
    }

    async update(id) {
        try {
            await db.collection("comments").doc(id).update({
                content: this.content
            });
        } catch (error) {
            throw new Error("Error updating comment");
        }
    }

    static async delete(id) {
        try {
            await db.collection("comments").doc(id).delete();
        } catch (error) {
            throw new Error("Error deleting comment");
        }
    }
}

module.exports = Comment;
