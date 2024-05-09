const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const eventRef = await db.collection("events").add({
            title,
            date,
            description
        });
        res.status(201).json({ message: "Event created successfully", id: eventRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const snapshot = await db.collection("events").get();
        const events = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            events.push({ id: doc.id, ...data });
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error getting events", error });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventRef = await db.collection("events").doc(id).get();
        if (!eventRef.exists) {
            return res.status(404).json({ message: "Event not found" });
        }
        const event = eventRef.data();
        res.status(200).json({ id: eventRef.id, ...event });
    } catch (error) {
        res.status(500).json({ message: "Error getting event", error });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, description } = req.body;
        await db.collection("events").doc(id).update({
            title,
            date,
            description
        });
        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("events").doc(id).delete();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};
