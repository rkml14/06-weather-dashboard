//Global variables


var cityName = '';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=04b8acf30a32bcf0df086074838b6ea";


fetch(queryURL);
