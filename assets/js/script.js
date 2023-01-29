//Global variables

const cityInput = document.querySelector('city-form');
const cityName = document.querySelector('city-input')
const city = document.querySelector('city');
const date = document.querySelector('date');
const temp = document.querySelector('temp');
const humidity = document.querySelector('humidity');
const wind = document.querySelector('wind');
const testCity = "Toronto";

let APIKey = "304b8acf30a32bcf0df086074838b6ea";
let fiveDay = "http://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&units=metric&&appid=" + APIKey;
let currentDay = ""
let lat
let lon

let formSubmitHandler = function (event) {
    event.preventDefault();
  
    let username = cityInput.value.trim();
  };


 //trying to fetch 5 day- but only works with test city.  trying to do none test city 
fetch(fiveDay)
.then(function (response) {
    return response.json();
    })
     .then(function(data) {
    console.log(data)
})

function currentWeather() {
    let apiUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=304b8acf30a32bcf0df086074838b6ea'
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
            })
             .then(function(data) {
            console.log("Console log to check apiURL: " + data)
        })
    }
currentWeather();



// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}


// // function to find the current weather using latitude and longitude
function currentWeather() {
    let apiUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=304b8acf30a32bcf0df086074838b6ea'
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
            })
             .then(function(data) {
            console.log(data)
        })
    }
    currentWeather();



var formSubmitCity = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  // if (username) {
  //   getUserRepos(username);

  //   repoContainerEl.textContent = '';
  //   nameInputEl.value = '';
  // } else {
  //   alert('Please enter a GitHub username');
  // }
};

cityInput.addEventListener('submit', formSubmitCity);  //call the function for the button


