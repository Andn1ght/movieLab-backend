const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

class Event {
    constructor(title, date, description) {
        this.title = title;
        this.date = date;
        this.description = description;
    }

    static async getAll() {
        try {
            const snapshot = await db.collection("events").get();
            const events = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                events.push({ id: doc.id, ...data });
            });
            return events;
        } catch (error) {
            throw new Error("Error fetching events");
        }
    }

    static async getById(id) {
        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return { id: doc.id, ...data };
        } catch (error) {
            throw new Error("Error fetching event");
        }
    }

    async save() {
        try {
            const docRef = await db.collection("events").add({
                title: this.title,
                date: this.date,
                description: this.description
            });
            return docRef.id;
        } catch (error) {
            throw new Error("Error saving event");
        }
    }

    async update(id) {
        try {
            await db.collection("events").doc(id).update({
                title: this.title,
                date: this.date,
                description: this.description
            });
        } catch (error) {
            throw new Error("Error updating event");
        }
    }

    static async delete(id) {
        try {
            await db.collection("events").doc(id).delete();
        } catch (error) {
            throw new Error("Error deleting event");
        }
    }
}

module.exports = Event;
