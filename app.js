// app.js
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/api/', (req, res) => {
  res.send('Expense management!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});