const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

class Stuff {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    // Static method to fetch all stuffs from Firestore
    static async getAll() {
        try {
            const snapshot = await db.collection("stuffs").get();
            const stuffs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                stuffs.push({ id: doc.id, ...data });
            });
            return stuffs;
        } catch (error) {
            throw new Error("Error fetching stuffs");
        }
    }

    // Static method to fetch a stuff by ID from Firestore
    static async getById(id) {
        try {
            const doc = await db.collection("stuffs").doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return { id: doc.id, ...data };
        } catch (error) {
            throw new Error("Error fetching stuff");
        }
    }

    // Instance method to save a new stuff to Firestore
    async save() {
        try {
            const docRef = await db.collection("stuffs").add({
                name: this.name,
                description: this.description
            });
            return docRef.id;
        } catch (error) {
            throw new Error("Error saving stuff");
        }
    }

    // Instance method to update an existing stuff in Firestore
    async update(id) {
        try {
            await db.collection("stuffs").doc(id).update({
                name: this.name,
                description: this.description
            });
        } catch (error) {
            throw new Error("Error updating stuff");
        }
    }

    // Static method to delete a stuff by ID from Firestore
    static async delete(id) {
        try {
            await db.collection("stuffs").doc(id).delete();
        } catch (error) {
            throw new Error("Error deleting stuff");
        }
    }
}

module.exports = Stuff;
