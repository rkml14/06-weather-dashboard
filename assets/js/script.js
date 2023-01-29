//Global variables
let cityFormEl = $('#city-form');
let cityInputEl = $('#city-input');

const city = document.querySelector('city');
const date = document.querySelector('date');
const temp = document.querySelector('temp');
const humidity = document.querySelector('humidity');
const wind = document.querySelector('wind');
const testCity = "Toronto";
const testCity2 = "Paris";

let apiKey = "304b8acf30a32bcf0df086074838b6ea";
// let fiveDay = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&limit=1&&units=metric&appid=" + apiKey;
let currentDay = ""
let lat;
let lon;



// To save the user's inputed city name for the currentWeather fetch
$("#city-form").on("submit", function (event) {   //id from form html
    event.preventDefault();

    // get name of city searched
    cityInputEl = $("#city-input").val(); //id from label html
    console.log(cityInputEl);  //checking to see if it is taking in data from the form

    if (cityInputEl === "" || cityInputEl == null) {  //prevent no data entry by user 
        //send alert if search input is empty when submitted
        alert("Please enter a city name");
        event.preventDefault();
    }
    else {
        currentWeather(cityInputEl);  //this fetch is working
    }
});

//fetch is working for currentWeather.  Need to extract data for current day
function currentWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&limit=1&units=metric&appid=" + apiKey;
    fetch(queryURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            console.log(res)
            lat = res.coord.lat;
            lon = res.coord.lon;
            console.log("lat", lat)
            console.log("lon", lon)
            fiveDayForecast();    
            //fiveDayForecast needs to be inside the currentWeather function as it was running before the latter and not bringing over the lat & lon variables
        })

};

//Function to get the 5 day forecast, using the lat & lon from the currentWeather function above
function fiveDayForecast() {
    console.log(lat,lon);
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + apiKey;
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        });
}
