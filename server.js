const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sample data structure for silos
let silos = [
  { id: 1, name: 'Silo 1', capacity: 100, currentLevel: 50 },
  { id: 2, name: 'Silo 2', capacity: 200, currentLevel: 150 },
];

// Get all silos
app.get('/api/silos', (req, res) => {
  res.json(silos);
});

// Add a new silo
app.post('/api/silos', (req, res) => {
  const newSilo = {
    id: silos.length + 1,  // Simple ID assignment
    name: req.body.name,
    capacity: req.body.capacity,
    currentLevel: req.body.currentLevel,
  };
  silos.push(newSilo);
  res.status(201).json(newSilo);
});

// Update a specific silo
app.put('/api/silos/:id', (req, res) => {
  const siloId = parseInt(req.params.id);
  const silo = silos.find(s => s.id === siloId);
  if (!silo) return res.status(404).send("Silo not found");

  // Update silo data
  silo.name = req.body.name;
  silo.capacity = req.body.capacity;
  silo.currentLevel = req.body.currentLevel;
  res.json(silo);
});

// Delete a specific silo
app.delete('/api/silos/:id', (req, res) => {
  const siloId = parseInt(req.params.id);
  const siloIndex = silos.findIndex(s => s.id === siloId);
  if (siloIndex === -1) return res.status(404).send("Silo not found");

  // Remove silo from the array
  const removedSilo = silos.splice(siloIndex, 1);
  res.json(removedSilo);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
