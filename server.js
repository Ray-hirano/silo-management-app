const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sample data structure for silos
let silos = [
  { id: 1, name: 'Silo 1', capacity: 100, currentLevel: 100 },
  { id: 2, name: 'Silo 2', capacity: 200, currentLevel: 150 },
  { id: 3, name: 'Silo 3', capacity: 200, currentLevel: 170 },
  { id: 3, name: 'Silo 4', capacity: 500, currentLevel: 600 },
];

// GET route for /api/silos
app.get('/api/silos', (req, res) => {
  const siloStatuses = silos.map(silo => {
    let status = 'normal'; // Default status is normal

    if (silo.currentLevel >= silo.capacity) {
      status = 'overCapacity'; // Over capacity if currentLevel is greater than capacity
    } else if (silo.currentLevel >= silo.capacity * 0.1) {
      status = 'nearCapacity';
    }  
    return { ...silo, status }; // Add the status property to each silo
  });

  res.json(siloStatuses);
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

