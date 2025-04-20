const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const likeRoutes = require("./routes/likeRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

// Middlewares
// app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5170", // Replace with your frontend URL
    credentials: true, // Allow cookies
  })
);

// Routes (you can add route files here)
app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
