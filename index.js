const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});

function fetchWeatherAlerts(state) {
  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts");
      }
      return response.json();
    })
    .then(data => {
      displayAlerts(data);

      input.value = "";

      clearError();
    })
    .catch(error => {
      displayError(error.message);
    });
}

function displayAlerts(data) {
  alertDisplay.innerHTML = "";

  const features = data.features || [];

  const header = document.createElement("h3");
  header.textContent = `Weather Alerts: ${features.length}`;
  alertDisplay.appendChild(header);

  const list = document.createElement("ul");

  features.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.properties.headline;
    list.appendChild(li);
  });

  alertDisplay.appendChild(list);
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}