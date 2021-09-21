var APIKey = "594f4b0a93a1af56a8fb27e3af8c5bc2";

var searchBtn = document.getElementById("submit");

// current weather
var currentWeatherContainer = document.querySelector(".current-weather");

var cityDateEl = document.getElementById("city-date");

var currentTemp = document.getElementById("temp");
var currentWind = document.getElementById("wind");
var currentHumid = document.getElementById("humidity");
var currentUVI = document.getElementById("uv-index");

// five day forecast
var fiveDayContainer = document.getElementById("forecast-box");
console.log(fiveDayContainer);
var fiveDayTitleEl = document.getElementById("forecast-title");


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

                  var lat = data.coord.lat;
                  var lon = data.coord.lon;

                  var requestUrlUVI = "http://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

                  fetch(requestUrlUVI)
                        .then(function (response) {
                              return response.json();
                        })
                        .then(function (data) {
                              console.log(data);

                              currentUVI.textContent = "UV Index: " + data.current.uvi;

                              var uviColor = data.current.uvi;
                              if (uviColor < 2) {
                                    currentUVI.setAttribute("class", "bg-success text-white");
                              } else if (3 < uviColor < 5) {
                                    currentUVI.setAttribute("class", "bg-warning text-white");
                              } else if (6 < uviColor < 7) {
                                    currentUVI.setAttribute("class", "bg-orange text-white");
                              } else if (8 < uviColor < 10) {
                                    currentUVI.setAttribute("class", "bg-danger text-white");
                              } else if (uviColor > 10) {
                                    currentUVI.setAttribute("class", "bg-violet text-white");
                              }

                              fiveDayTitleEl.textContent = "5-Day Forecast:"

                              for (let i = 0; i < 5; i++) {
                                    var weatherCard = document.createElement("div");
                                    fiveDayContainer.appendChild(weatherCard);

                              }
                        })
            })
}

searchBtn.addEventListener('click', getData)


