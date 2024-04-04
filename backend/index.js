// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
require("dotenv").config();
const mongoUrl = process.env.MONGODB_URL;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoUrl)

// Routes
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
