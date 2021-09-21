var APIKey = "594f4b0a93a1af56a8fb27e3af8c5bc2";

var searchBtn = $("#submit");

// current weather
var currentWeatherContainer = $(".current-weather");

var cityDateEl = $("#city-date");

var currentTemp = $("#temp");
var currentWind = $("#wind");
var currentHumid = $("#humidity");
var currentUVI = $("#uv-index");

// five day forecast
var fiveDayContainer = $("#forecast-box");
var fiveDayTitleEl = $("#forecast-title");


var currentDate = moment().format("M/DD/YYYY");

var historyEl = $("#history");
var searchHistory = [];

function getData(cityPrev) {

      var city = $("#city").val();

      if (city.length === 0) {
            city = cityPrev;
      }

      var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

      fetch(queryUrl)
            .then(function (response) {
                  console.log(response);
                  return response.json();
            })
            .then(function (data) {
                  console.log(data);

                  cityDateEl.text(city + " - " + currentDate);
                  currentTemp.text("Temperature: " + data.main.temp + "°F");
                  currentWind.text("Wind: " + data.wind.speed + " MPH");
                  currentHumid.text("Humidity: " + data.main.humidity + "%");

                  var lat = data.coord.lat;
                  var lon = data.coord.lon;

                  var requestUrlUVI = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

                  fetch(requestUrlUVI)
                        .then(function (response) {
                              return response.json();
                        })
                        .then(function (data) {
                              console.log(data);

                              currentUVI.text("UV Index: " + data.current.uvi);

                              var uviColor = data.current.uvi;
                              if (uviColor <= 2) {
                                    currentUVI.attr("class", "bg-success text-white");
                              }
                              else if (uviColor <= 3 && uviColor <= 5) {
                                    currentUVI.attr("class", "bg-warning text-white");
                              }
                              else if (uviColor <= 6 && uviColor <= 7) {
                                    currentUVI.attr("class", "bg-orange text-white");
                              }
                              else if (uviColor <= 8 && uviColor <= 10) {
                                    currentUVI.attr("class", "bg-danger text-white");
                              }
                              else if (uviColor > 10) {
                                    currentUVI.attr("class", "bg-violet text-white");
                              }

                              fiveDayTitleEl.text("5-Day Forecast:");

                              var forecast = "";

                              $.each(data.daily, function (index, val) {
                                    if (index < 5) {
                                          forecast += "<div class='days bg-info text-white col text-center'>";
                                          forecast += "<h5>Day " + (index + 1) + "</h5> ";
                                          forecast += "<p>Temp: " + val.temp.day + "&degF</p> ";
                                          forecast += "<p>Wind: " + val.wind_speed + " mph</p> ";
                                          forecast += "<p>Humidity: " + val.humidity + "%</p>";
                                          forecast +=
                                                '<img src= "https://openweathermap.org/img/wn/' +
                                                val.weather[0].icon +
                                                '@2x.png">';
                                          forecast += "<p>" + val.weather[0].description + "</p>";
                                          forecast += "</div>";
                                    }
                              });
                              $("#forecasts").html(forecast);

                              setHistory();
                              clearTextField();
                        })
            })
}

function clearTextField() {
      $("#city").val("");
}

function setHistory() {
      // set search history to local storage
      var prevCity = $("#city").val();

      if (prevCity.length === 0) {
            return;
      }

      searchHistory.push(prevCity);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

      for (let i = 0; i < searchHistory.length; i++) {
            var prevCityEl = $('<button>');
            prevCityEl.text(searchHistory[i]);
      }
      prevCityEl.attr("class", "prev-cities btn btn-secondary btn-block");
      historyEl.append(prevCityEl).append("<br />");
}

function renderCities() {
      var storedArr = JSON.parse(localStorage.getItem("searchHistory"));
      if (storedArr !== null) {
            searchHistory = storedArr;
      }
}

renderCities();

function renderPrevCity(event) {
      event.preventDefault();
      var historyBtn = $(event.target);
      getData(historyBtn.text());
}

historyEl.on("click", ".prev-cities", renderPrevCity);

searchBtn.on('click', getData)

