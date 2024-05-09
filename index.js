const express = require("express");
const firebase = require("firebase");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Firebase
firebase.initializeApp(require("./config/firebaseConfig"));

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require("./router/authRoutes");
const stuffRoutes = require("./router/stuffsRoutes");
const actorRoutes = require("./router/actorsRoutes");
const newsRoutes = require("./router/newsRoutes");
const commentRoutes = require("./router/commentsRoutes");
const eventRoutes = require("./router/eventsRoutes");

app.use("/auth", authRoutes);
app.use("/stuffs", stuffRoutes);
app.use("/actors", actorRoutes);
app.use("/news", newsRoutes);
app.use("/comments", commentRoutes);
app.use("/events", eventRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
