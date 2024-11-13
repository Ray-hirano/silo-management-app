fetch('http://localhost:3000/api/silos')
  .then(response => response.json())
  .then(data => {
    const siloContainer = document.getElementById('silo-container');
    siloContainer.innerHTML = ''; // Clear any existing content

    // Loop through each silo in the data and display its information
    data.forEach(silo => {
      const siloElement = document.createElement('div');
      siloElement.classList.add('silo');

      // Add the correct class based on the silo status
      if (silo.status === 'overCapacity') {
        siloElement.classList.add('overCapacity');
      } else if (silo.status === 'nearCapacity') {
        siloElement.classList.add('nearCapacity');
      } else {
        siloElement.classList.add('normal');
      }

      // Insert silo data into the HTML
      siloElement.innerHTML = `
        <h3>${silo.name}</h3>
        <p>Capacity: ${silo.capacity}</p>
        <p>Current Level: ${silo.currentLevel}</p>
      `;

      siloContainer.appendChild(siloElement);
    });
  })
  .catch(error => {
    console.error("Error fetching silo data:", error);
  });
