const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (you can add route files here)
// app.use('/api/images', require('./routes/imageRoutes'));
app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
