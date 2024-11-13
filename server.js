const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to handle JSON and enable CORS
app.use(express.json());
app.use(cors());

// Sample endpoint to check if the server is running
app.get('/api/status', (req, res) => {
  res.json({ message: 'Silo management backend is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
