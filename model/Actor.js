const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

class Actor {
    constructor(name, characterName, bio, imageUrl) {
        this.name = name;
        this.characterName = characterName;
        this.bio = bio;
        this.imageUrl = imageUrl
    }

    static async getAll() {
        try {
            const snapshot = await db.collection("actors").get();
            const actors = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                actors.push({ id: doc.id, ...data });
            });
            return actors;
        } catch (error) {
            throw new Error("Error fetching actors");
        }
    }

    static async getById(id) {
        try {
            const doc = await db.collection("actors").doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return { id: doc.id, ...data };
        } catch (error) {
            throw new Error("Error fetching actor");
        }
    }

    async save() {
        try {
            const docRef = await db.collection("actors").add({
                name: this.name,
                characterName: this.characterName,
                bio: this.bio,
                imageUrl: this.imageUrl
            });
            return docRef.id;
        } catch (error) {
            throw new Error("Error saving actor");
        }
    }

    async update(id) {
        try {
            await db.collection("actors").doc(id).update({
                name: this.name,
                characterName: this.characterName,
                bio: this.bio,
                imageUrl: this.imageUrl
            });
        } catch (error) {
            throw new Error("Error updating actor");
        }
    }

    static async delete(id) {
        try {
            await db.collection("actors").doc(id).delete();
        } catch (error) {
            throw new Error("Error deleting actor");
        }
    }
}

module.exports = Actor;
