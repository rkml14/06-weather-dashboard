//Global variables

let APIKey = "304b8acf30a32bcf0df086074838b6ea";
let city = document.querySelector('#city-name');


// let cityNameSubmit = function (event) {
//     event.preventDefault();
//     let cityName = city.value.trim();
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//     fetch(queryURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data)
//         })
//     }

    



let lat = 51.5098;
let lon = -0.1180;



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

    
        // let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={'+ lat +'}&lon={'+ lon +'}&limit={1}&units=metric&appid=' + APIKey;


//   5 day forecast

//   api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&limit={1}&appid={API key}


//   Geocoding
//   http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={1}&appid={API key}


// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}