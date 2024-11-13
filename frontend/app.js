// Fetch silo data from the backend and render it on the page
fetch('http://localhost:3000/api/silos')
  .then(response => response.json())  // Parse JSON response
  .then(data => {
    const siloContainer = document.getElementById('silo-container');
    siloContainer.innerHTML = ''; // Clear any existing content in the container

    // Iterate over each silo in the data and create HTML elements for them
    data.forEach(silo => {
      const siloElement = document.createElement('div');
      siloElement.classList.add('silo'); // Add a basic silo class
      siloElement.classList.add(silo.status); // Add status-based class (normal, nearCapacity, or overCapacity)

      // Add the silo data (name, capacity, current level) to the silo element
      siloElement.innerHTML = `
        <h3>${silo.name}</h3>
        <p>Capacity: ${silo.capacity}</p>
        <p>Current Level: ${silo.currentLevel}</p>
      `;

      // Append the silo element to the container
      siloContainer.appendChild(siloElement);
    });
  })
  .catch(error => {
    console.error("Error fetching silo data:", error);
  });
