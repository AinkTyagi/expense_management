const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const app = express(); // ✅ Create app before using it

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
