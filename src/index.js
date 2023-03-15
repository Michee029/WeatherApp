function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  return `${currentDay} ${hours}:${minutes}`;
}

let displayDate = document.querySelector("#dateAndTime");
let currentDate = new Date();
displayDate.innerHTML = formatDate(currentDate);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}

function getWeather(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind-speed");
  let description = document.querySelector("#weather-description");
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  city.innerHTML = response.data.name;
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = enteredCity.value;
}
let myLocationButton = document.querySelector("#current-button");
myLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let cityInput = document.querySelector("#city-input");
cityInput.addEventListener("submit", displayCity);
