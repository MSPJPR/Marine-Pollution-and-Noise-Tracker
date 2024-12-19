// Simulate Pollution Data
function fetchPollutionData() {
  const pollutionData = [
    { location: 'Pacific Ocean', pollutant: 'Plastic', level: 'High' },
    { location: 'Atlantic Ocean', pollutant: 'Oil Spills', level: 'Medium' },
    { location: 'Indian Ocean', pollutant: 'Chemical Waste', level: 'Low' },
  ];

  let output = '<ul>';
  pollutionData.forEach(item => {
    output += `<li><strong>Location:</strong> ${item.location}, <strong>Pollutant:</strong> ${item.pollutant}, <strong>Level:</strong> ${item.level}</li>`;
  });
  output += '</ul>';

  document.getElementById('pollution-data').innerHTML = output;
}

// Simulate Noise Data
function fetchNoiseData() {
  const noiseData = [
    { type: 'Seismic', source: 'Earthquakes', intensity: 'High' },
    { type: 'Biological', source: 'Dolphins', intensity: 'Medium' },
    { type: 'Man-made', source: 'Shipping', intensity: 'High' },
  ];

  let output = '<ul>';
  noiseData.forEach(item => {
    output += `<li><strong>Type:</strong> ${item.type}, <strong>Source:</strong> ${item.source}, <strong>Intensity:</strong> ${item.intensity}</li>`;
  });
  output += '</ul>';

  document.getElementById('noise-data').innerHTML = output;
}

// Fetch Real-Time Ocean Data from NOAA API
async function fetchRealTimeData() {
  const response = await fetch('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json');
  const data = await response.json();

  let output = '<ul>';
  data.stations.slice(0, 5).forEach(station => {
    output += `<li><strong>Station:</strong> ${station.name}, <strong>Location:</strong> ${station.state}</li>`;
  });
  output += '</ul>';

  document.getElementById('real-time-data').innerHTML = output;
}

// Interactive Map using Leaflet.js
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);
});

// Local Storage for Custom Data
function saveCustomData() {
  const input = document.getElementById('custom-input').value;
  localStorage.setItem('customData', input);
  displayCustomData();
}

function displayCustomData() {
  const savedData = localStorage.getItem('customData');
  document.getElementById('saved-data').innerHTML = savedData ? `Saved Data: ${savedData}` : '';
}

// Dark Mode Toggle
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Export Data to PDF
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Adding content to the PDF
  doc.text('Marine Pollution and Noise Tracker Data', 10, 10);
  
  const pollutionData = document.getElementById('pollution-data').innerText;
  const noiseData = document.getElementById('noise-data').innerText;
  const realTimeData = document.getElementById('real-time-data').innerText;

  doc.text(`\nPollution Data:\n${pollutionData}`, 10, 20);
  doc.text(`\nNoise Data:\n${noiseData}`, 10, 50);
  doc.text(`\nReal-Time Ocean Data:\n${realTimeData}`, 10, 80);
  
  // Save the PDF
  doc.save('marine_data.pdf');
}
