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
let lat
let lon



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
        currentWeather(cityInputEl);  //need to build these functions
        // fiveDayForecast(cityInputEl);  //need to build these functions 
    }
});

function currentWeather() {
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&limit=1&&units=metric&appid=" + apiKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
        .then(function (response) {
            // get city's longitude and latitude
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;
        })
};




// let currentWeather = function (cityInputEl) {
//     // get and use data from open weather current weather api end point
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//         // get response and turn it into objects
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             // get city's longitude and latitude
//             var cityLon = response.coord.lon;
//             var cityLat = response.coord.lat;

//             fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
//                 // get response from one call api and turn it into objects
//                 .then(function (response) {
//                     return response.json();
//                 })
//             });
// };






// function currentWeather() {
//     let apiUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=304b8acf30a32bcf0df086074838b6ea'
//     fetch(apiUrl)
//         .then(function (response) {
//             return response.json();
//             })
//              .then(function(data) {
//             console.log("Console log to check apiURL: " + data)
//         })
//     }
// currentWeather();



//trying to fetch 5 day- but only works with test city.  trying to do none test city


// fetch(fiveDay)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })
//     .then(function (response) {
//         // get city's longitude and latitude
//         let lat= response.lon;
//         let lon = response.lat;
//     })

// function currentWeather() {
//     let apiUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=304b8acf30a32bcf0df086074838b6ea'
//     fetch(apiUrl)
//         .then(function (response) {
//             return response.json();
//             })
//              .then(function(data) {
//             console.log("Console log to check apiURL: " + data)
//         })
//     }
// currentWeather();


// // function to find the current weather using latitude and longitude







// var formSubmitCity = function (event) {
//   event.preventDefault();

//   var username = nameInputEl.value.trim();

  // if (username) {
  //   getUserRepos(username);

  //   repoContainerEl.textContent = '';
  //   nameInputEl.value = '';
  // } else {
  //   alert('Please enter a GitHub username');
  // }
// };

// cityForm.addEventListener('submit', formSubmitCity);  //call the function for the button


