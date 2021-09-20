var APIKey = "594f4b0a93a1af56a8fb27e3af8c5bc2";

var searchBtn = document.getElementById("submit");

var currentWeather = document.querySelector(".current-weather");

function getData(event) {
      event.preventDefault();

      var city = document.getElementById("city").value;
      var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

      fetch(queryUrl)
            .then(function (response) {
                  console.log(response);
                  return response.json();
            })
            .then(function (data) {
                  console.log(data);
            })
}

searchBtn.addEventListener('click', getData)