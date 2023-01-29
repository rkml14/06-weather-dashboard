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

let APIKey = "304b8acf30a32bcf0df086074838b6ea";
let fiveDay = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&limit=1&&units=metric&&appid=" + APIKey;
let currentDay = ""
let lat
let lon



    // Being called when city is submitted 
    $("#city-form").on("submit", function(event) {   //id from form html
        event.preventDefault();
        
        // get name of city searched
        var cityName = $("#city-input").val(); //id from label html
        console.log(cityName);  //checking to see if it is taking in data from the form
    
        if (cityName === "" || cityName == null) {  //prevent no data entry by user 
            //send alert if search input is empty when submitted
            alert("Please enter a city name");
            event.preventDefault();
        }
        //  else {
        //     // function would need to go here to run the whole thing 
        // }
    });

    



// let formSubmitHandler = function (event) {
//     event.preventDefault();
  
//     let cityName = cityFormEl.value.trim();
//   };


 //trying to fetch 5 day- but only works with test city.  trying to do none test city 


// fetch(fiveDay)
// .then(function (response) {
//     return response.json();
//     })
//      .then(function(data) {
//     console.log(data)
// })

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


