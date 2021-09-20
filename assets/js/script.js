var APIKey = "594f4b0a93a1af56a8fb27e3af8c5bc2";

var searchBtn = document.getElementById("submit");

var currentWeatherContainer = document.querySelector(".current-weather");

var cityDateEl = document.getElementById("city-date");
var currentTemp = document.getElementById("temp");
var currentWind = document.getElementById("wind");
var currentHumid = document.getElementById("humidity");
var currentUVI = document.getElementById("uv-index");

var currentDate = moment().format("M/DD/YYYY");

function getData(event) {
      event.preventDefault();

      var city = document.getElementById("city").value;
      var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

      fetch(queryUrl)
            .then(function (response) {
                  console.log(response);
                  return response.json();
            })
            .then(function (data) {
                  console.log(data);

                  cityDateEl.textContent = city + " - " + currentDate;
                  currentTemp.textContent = "Temperature: " + data.main.temp + "°F";
                  currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
                  currentHumid.textContent = "Humidity: " + data.main.humidity + "%";


            })
}

searchBtn.addEventListener('click', getData)