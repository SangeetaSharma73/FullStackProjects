const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (you can add route files here)
// app.use('/api/images', require('./routes/imageRoutes'));

module.exports = app;
