//Global variables

//from the form
let cityFormEl = $('#city-form');
let cityInputEl = $('#city-input');

// const city = document.querySelector('city');
// const date = document.querySelector('date');
// const temp = document.querySelector('temp');
// const humidity = document.querySelector('humidity');
// const wind = document.querySelector('wind');



let apiKey = "304b8acf30a32bcf0df086074838b6ea";
let lat;
let lon;
let icon;
let temp;
let humidity;
let wind;


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

//Fetch is working for currentWeather to extract data for current day
function currentWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&limit=1&units=metric&appid=" + apiKey;
    fetch(queryURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            console.log(res)

            //Declaring and initiliazing the variables values from the above json response
            lat = res.coord.lat;
            lon = res.coord.lon;
            icon = res.weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            temp = res.main.temp;
            humidity = res.main.humidity;
            wind = res.wind.speed;
            //To confirm that the right information has been logged
            console.log("lat", lat);
            console.log("lon", lon);
            console.log("icon", iconURL);
            console.log("temp", temp);
            console.log("humidity", humidity);
            console.log("wind", wind);
            windKM = Math.floor((wind) * 3.6);

            //To output the city name & time 
            document.getElementById("city").innerHTML = cityInputEl;
            let today = dayjs();
            $('#date').text(today.format('MMM D, YYYY'));

            // To get the Icon of the weather on the page
            let iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + ".png")
            $("#city").append(iconImg);

            //to outpout the temp, humidity & wind to the page
            document.getElementById("temp").innerHTML = "Temp: " + temp + " °С";
            document.getElementById("wind").innerHTML = "Wind: " + windKM + " km/hr";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";

            //fiveDayForecast needs to be inside the currentWeather function as it was running before the latter and not bringing over the lat & lon variables
            fiveDayForecast();
            })
};


// h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");




//Function to get the 5 day forecast, using the lat & lon from the currentWeather function above
// function testingFunction() {
//     console.log(lat, lon);
//     let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + apiKey;
//     fetch(forecastURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             console.log(response);
//             testingFunction();
//         });

// }



//Function for the 5 day forecast, creates cards to append to the page
function fiveDayForecast() {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + apiKey;
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            for (var i = 4; i < response.list.length; i += 8) {
                //Declaring and initiliazing the variables values from the above json response
                foreIcon = response.list[i].weather[0].icon;
                foreIconURL = "http://openweathermap.org/img/w/" + foreIcon + ".png";
                foreTemp = response.list[i].main.temp;
                foreHumidity = response.list[i].main.humidity;
                foreWind = response.list[i].wind.speed;
                forewindKM = Math.floor((foreWind) * 3.6);
                //To confirm that the right information has been logged
                console.log("icon", foreIconURL);
                console.log("temp", foreTemp);
                console.log("humidity", foreHumidity);
                console.log("wind", foreWind);
                console.log("wind km", forewindKM);
            }
        });
}


