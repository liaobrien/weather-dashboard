var APIKey = "594f4b0a93a1af56a8fb27e3af8c5bc2";

var city = $("#city").val();

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;