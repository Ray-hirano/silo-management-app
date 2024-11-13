// Fetch silo data from the backend API
fetch('http://localhost:3000/api/silos')
  .then(response => response.json())
  .then(data => {
    const siloContainer = document.getElementById('silo-container');
    siloContainer.innerHTML = ''; // Clear any existing content

    data.forEach(silo => {
      const siloElement = document.createElement('div');
      siloElement.classList.add('silo');
      siloElement.setAttribute('data-id', silo.id); // Store silo id for reference

      // Determine text color classes for capacity
      let capacityClass;
      if (silo.currentLevel >= silo.capacity) {
        capacityClass = 'text-red';
      } else if (silo.currentLevel >= silo.capacity * 0.85) {
        capacityClass = 'text-orange';
      } else {
        capacityClass = 'text-green';
      }

      // Determine text color classes for temperature
      let temperatureClass;
      if (silo.temperature >= 33) {
        temperatureClass = 'text-red';
      } else if (silo.temperature >= 28) {
        temperatureClass = 'text-orange';
      } else if (silo.temperature <= 20) {
        temperatureClass = 'text-blue';
      } else {
        temperatureClass = 'text-green';
      }

      // Determine text color classes for humidity
      let humidityClass;
      if (silo.humidity >= 70 || silo.humidity <= 30) {
        humidityClass = 'text-red';
      } else if (silo.humidity >= 60 || silo.humidity <= 40) {
        humidityClass = 'text-orange';
      } else {
        humidityClass = 'text-green';
      }

      // Determine overall background color class based on all criteria
      let bgColorClass;
      if (capacityClass === 'text-red' && temperatureClass === 'text-red' && humidityClass === 'text-red') {
        bgColorClass = 'bg-red'; // All criteria are in red
      } else if (capacityClass === 'text-orange' || temperatureClass === 'text-orange' || humidityClass === 'text-orange') {
        bgColorClass = 'bg-orange'; // At least one criterion is in orange
      } else {
        bgColorClass = 'bg-green'; // All criteria are good (green)
      }

      // Insert HTML with conditional classes for text colors and background
      siloElement.classList.add(bgColorClass); // Add the background color class

      siloElement.innerHTML = `
        <h3>${silo.name}</h3>
        <p>Capacity: ${silo.capacity}</p>
        <p>Current Level: <span class="${capacityClass}">${silo.currentLevel}</span></p>
        <p>Humidity: <span class="${humidityClass}">${silo.humidity}%</span></p>
        <p>Temperature: <span class="${temperatureClass}">${silo.temperature}°C</span></p>
      `;

      // Add click event listener to show the modal
      siloElement.addEventListener('click', () => showModal(silo));

      siloContainer.appendChild(siloElement);
    });
  })
  .catch(error => {
    console.error("Error fetching silo data:", error);
  });

// Show the modal with detailed silo information
function showModal(silo) {
  const modal = document.getElementById("silo-modal");
  const closeBtn = document.querySelector(".close");
  
  document.getElementById("modal-title").innerText = silo.name;
  document.getElementById("modal-capacity").innerText = silo.capacity;
  document.getElementById("modal-currentLevel").innerText = silo.currentLevel;
  document.getElementById("modal-humidity").innerText = silo.humidity + '%';
  document.getElementById("modal-temperature").innerText = silo.temperature + '°C';

  // Display historical data in the modal
  const historicalContainer = document.getElementById("modal-historical");
  historicalContainer.innerHTML = ""; // Clear previous data
  if (silo.historicalData && silo.historicalData.length > 0) {
    const historicalList = document.createElement("ul");
    silo.historicalData.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.date}: Level ${item.level}`;
      historicalList.appendChild(listItem);
    });
    historicalContainer.appendChild(historicalList);
  } else {
    historicalContainer.innerText = "No historical data available.";
  }

  document.getElementById("modal-trend").innerText = "Example trend"; // Replace with actual trend

  modal.style.display = "block";

  // Close the modal when the user clicks on the close button
  closeBtn.onclick = () => {
    modal.style.display = "none";
  }

  // Close the modal if the user clicks outside of it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
}
