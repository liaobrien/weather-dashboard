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
var cities = [];

function getData(event) {
      event.preventDefault();

      var city = $("#city").val();
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

                  var requestUrlUVI = "http://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

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
                              } else if (3 <= uviColor <= 5) {
                                    currentUVI.attr("class", "bg-warning text-white");
                              } else if (6 <= uviColor <= 7) {
                                    currentUVI.attr("class", "bg-orange text-white");
                              } else if (8 <= uviColor <= 10) {
                                    currentUVI.attr("class", "bg-danger text-white");
                              } else if (uviColor > 10) {
                                    currentUVI.attr("class", "bg-violet text-white");
                              }

                              fiveDayTitleEl.text("5-Day Forecast:");

                              var forecast = "";
                              forecast += "<b>" + city + "</b>";
                              $.each(data.daily, function (index, val) {
                                    if (index < 5) {
                                          forecast += "<p>";
                                          forecast += "<b>Day " + (index + 1) + "</b>: ";
                                          forecast += "Temp: " + val.temp.day + "&degF | ";
                                          forecast += "Wind: " + val.wind_speed + " mph | ";
                                          forecast += "Humidity: " + val.humidity + "%";
                                          forecast +=
                                                '<img src= "https://openweathermap.org/img/wn/' +
                                                val.weather[0].icon +
                                                '@2x.png">';
                                          forecast += "<span>" + val.weather[0].description + "</span>";
                                          forecast += "</p>";
                                    }
                              });
                              $("#forecasts").html(forecast);

                              // set search history to local storage
                              cities.push(city);
                              localStorage.setItem("cities", JSON.stringify(cities));

                              for (let i = 0; i < cities.length; i++) {
                                    var cityEl = $('<button>');
                                    cityEl.text(cities[i]);
                              }
                              historyEl.append(cityEl);
                              // now i need getitem
                        })
            })
}

searchBtn.on('click', getData)


