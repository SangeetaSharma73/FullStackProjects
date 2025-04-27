const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const offerRoutes = require("./routes/offerRoutes");
const feedRoutes = require("./routes/feedRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Middlewares
app.use(cors());
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5170", // Replace with your frontend URL
//     credentials: true, // Allow cookies
//   })
// );

// Routes (you can add route files here)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
