const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// Route to serve the static HTML and JavaScript files for the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get silo data from JSON file
app.get('/api/silos', (req, res) => {
  fs.readFile(path.join(__dirname, 'silo-data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load silo data" });
    }
    const silos = JSON.parse(data);
    res.json(silos);
  });
});

// Endpoint to add a new silo entry
app.post('/api/silos', (req, res) => {
  fs.readFile(path.join(__dirname, 'silo-data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load silo data" });
    }
    
    const silos = JSON.parse(data);
    const newSilo = {
      id: silos.length + 1,
      name: req.body.name,
      capacity: req.body.capacity,
      currentLevel: req.body.currentLevel,
      humidity: req.body.humidity,
      temperature: req.body.temperature
    };
    silos.push(newSilo);

    // Write updated data back to JSON file
    fs.writeFile(path.join(__dirname, 'silo-data.json'), JSON.stringify(silos, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
        return res.status(500).json({ error: "Failed to save new silo data" });
      }
      res.status(201).json(newSilo);
    });
  });
});

// Endpoint to update an existing silo entry by ID
app.put('/api/silos/:id', (req, res) => {
  const siloId = parseInt(req.params.id);

  fs.readFile(path.join(__dirname, 'silo-data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load silo data" });
    }
    
    const silos = JSON.parse(data);
    const siloIndex = silos.findIndex(s => s.id === siloId);

    if (siloIndex === -1) {
      return res.status(404).json({ error: "Silo not found" });
    }

    // Update the silo data
    silos[siloIndex] = { ...silos[siloIndex], ...req.body };

    // Write updated data back to JSON file
    fs.writeFile(path.join(__dirname, 'silo-data.json'), JSON.stringify(silos, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
        return res.status(500).json({ error: "Failed to update silo data" });
      }
      res.json(silos[siloIndex]);
    });
  });
});

// Endpoint to delete a silo by ID
app.delete('/api/silos/:id', (req, res) => {
  const siloId = parseInt(req.params.id);

  fs.readFile(path.join(__dirname, 'silo-data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load silo data" });
    }

    const silos = JSON.parse(data);
    const siloIndex = silos.findIndex(s => s.id === siloId);

    if (siloIndex === -1) {
      return res.status(404).json({ error: "Silo not found" });
    }

    // Remove the silo from the array
    const removedSilo = silos.splice(siloIndex, 1);

    // Write updated data back to JSON file
    fs.writeFile(path.join(__dirname, 'silo-data.json'), JSON.stringify(silos, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
        return res.status(500).json({ error: "Failed to delete silo data" });
      }
      res.json(removedSilo);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
