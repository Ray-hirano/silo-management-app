const silos = [
    { id: 1, name: 'Silo 1', level: 60, status: 'ok' },
    { id: 2, name: 'Silo 2', level: 25, status: 'alert' },
    { id: 3, name: 'Silo 3', level: 75, status: 'ok' },
  ];
  
  function displaySilos() {
    const silosContainer = document.getElementById('silos');
    silosContainer.innerHTML = ''; // Clear previous entries
  
    silos.forEach((silo) => {
      const siloDiv = document.createElement('div');
      siloDiv.classList.add('silo');
      siloDiv.innerHTML = `
        <h2>${silo.name}</h2>
        <p>Level: ${silo.level}%</p>
        <p class="silo-status ${silo.status}">${silo.status === 'ok' ? 'Normal' : 'Alert'}</p>
      `;
      silosContainer.appendChild(siloDiv);
    });
  }
  
  document.addEventListener('DOMContentLoaded', displaySilos);
  