// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// querying the dom
const input = document.getElementById('state-input');
const button = document.getElementById('fetch-alerts');
const alertDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

//Step1. fetching alert
function fetchWeatherAlerts(state) {
  fetch(`${weatherApi}${state}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error.message);
    });
}

// Step 2. display alert
function displayAlerts(data) {
  // clearing old content 
  alertDisplay.innerHTML = "";

  const features = data.features;

  // summary messages
  const summary = document.createElement("h3");

  summary.textContent =
    `Current watches, warnings, and advisories for ${data.title}: ${features.length}`;

  alertDisplay.appendChild(summary);

  // alert list
  const list = document.createElement("ul");

  features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertDisplay.appendChild(list);
}

// Step 3. error handling
function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

//  event listener 
button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});