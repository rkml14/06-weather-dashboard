//Global variables
let apiKey = "304b8acf30a32bcf0df086074838b6ea";
let lat;
let lon;
let icon;
let temp;
let humidity;
let wind;

//From the HTML
let cityFormEl = $('#city-form');
let cityInputEl = $('#city-input');

let cityForecastEl = $('#city-forecast');
let displayForecastEl = $('#display-forecast');
let forecastCardEl = $("#forecast-card");


// To save the user's inputed city name for the currentWeather fetch
$("#city-form").on("submit", function (event) {   //id from form html
    event.preventDefault();

    //Grab the name of city searched
    cityInputEl = $("#city-input").val(); //id from label html
    console.log(cityInputEl);  //checking to see if it is taking in data from the form


    if (cityInputEl === "" || cityInputEl == null) {  //prevent no data entry by user 
        //send alert if search input is empty when submitted
        alert("Please enter a city name");
        event.preventDefault();
    }
    else {
        //Clears the forecast cards that are created in the child node of the fiveDayFunction
        $("#forecast-card").empty();
        currentWeather(cityInputEl);
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
            temp = Math.floor(res.main.temp);
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

            //To get the Icon of the weather on the page
            let iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#city").append(iconImg);

            //To outpout the temp, humidity & wind to the page
            document.getElementById("temp").innerHTML = "Temp: " + temp + " °С";
            document.getElementById("wind").innerHTML = "Wind: " + windKM + " km/hr";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";

            //fiveDayForecast needs to be inside the currentWeather function as it was running before the latter and not bringing over the lat & lon variables
            fiveDayForecast();

        })
};


//Function for the 5 day forecast, creates cards to append to the page
function fiveDayForecast() {

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + apiKey;

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            //Loop to pull the 5 day forecast from the forecast fetch
            for (var i = 0; i < response.list.length; i += 8) {

                //Declaring and initiliazing the variables values from the above json response
                foreIcon = response.list[i].weather[0].icon;
                foreIconURL = "http://openweathermap.org/img/w/" + foreIcon + ".png";
                foreTemp = Math.floor(response.list[i].main.temp);
                foreHumidity = response.list[i].main.humidity;
                foreWind = response.list[i].wind.speed;
                forewindKM = Math.floor((foreWind) * 3.6);

                //To confirm that the right information has been logged from the variable
                console.log('for loop responses')
                console.log(response.list[i].dt_txt);
                console.log("icon", foreIconURL);
                console.log("temp", foreTemp);
                console.log("humidity", foreHumidity);
                console.log("wind", foreWind);
                console.log("wind km", forewindKM);

                //To create elements for the 5day forecast cards
                let fiveDay = $("<div class='card text-white bg-primary'>")
                let fiveTemp = $("<p>");
                let fiveHum = $("<p>");
                let fiveForeWind = $("<p>");
                let fiveImg = $("<img>");
                let fiveDate = $("<h6>");

                //To output the variables obtained from the loop into each dynamically created card
                fiveTemp.text("Temp: " + foreTemp + " °С")
                fiveHum.text("Humidity: " + foreHumidity + "%")
                fiveForeWind.text("Wind Speed: " + forewindKM + " km/hr");
                fiveDate.text("Date: " + response.list[i].dt_txt)
                let today = dayjs();
                $('#date').text(today.format('MMM D, YYYY'));
                fiveImg.addClass("img-fluid");
                fiveImg.addClass("w-25");
                fiveImg.attr("src", "https://openweathermap.org/img/wn/" + foreIcon + "@2x.png")

                //Appending the above output to HTML under section id=display-forecast
                fiveDay.append(fiveDate);
                fiveDay.append(fiveImg);
                fiveDay.append(fiveTemp);
                fiveDay.append(fiveForeWind);
                fiveDay.append(fiveHum);
                forecastCardEl.append(fiveDay);

            }
        });
}

///Saving cities entered to local storage
$(".btn").on("click", function () {
    //creating an array... to add inputValue in to save to local storage..
    let arrayOfCities = JSON.parse(localStorage.getItem("cities")) || []
    //the $(this) refers to the current element, aka the search button. then you find the sibling which includes the input tag, and get the value from it to get the value of the city entered
    let inputValue = $(this).siblings("input").val();   // $(this) <== the button element clicked. // $(this).siblings('input')  <== the input element in html
    arrayOfCities.push(inputValue)
    localStorage.setItem("cities", JSON.stringify(arrayOfCities))
});


///working on pulling cities from local storage
function loadPreviousCities() {
    let cityOneValue = localStorage.getItem("cities") /// retrieve array from the local storage
    console.log(cityOneValue);
    let localStorageArray = JSON.parse(localStorage.getItem("cities"))
    console.log("this localstorage", localStorageArray);

    ///loop through the array of cities & create a buton via javascript for the city
    for (let i = 0; i < localStorageArray.length; i++) { 
        let button = document.createElement("button"); 

        //set the inside of the button to be equal to the city name from the list
        let cityListEl = document.getElementById('city-1'); 
        button.textContent = localStorageArray[i];

        /// add the onclick to button
        //append the new button created with the city name inside of it  
        cityListEl.appendChild(button);
        console.log(localStorageArray[i]);
    }
}
loadPreviousCities();


//saved bits of scrapped code


// $(“.save”).on(“click”, function () {
//     //creating an array... to add inputValue in to save to local storage..
//     let arrayOfCities = JSON.parse(localStorage.getItem(“cities”)) || []
//     let inputValue = $(this).siblings(“input”).val();   // $(this) <== the button element clicked. // $(this).siblings(‘input’)  <== the input element in html
//     arrayOfCities.push(inputValue)
//     localStorage.setItem(“cities”, JSON.stringify(arrayOfCities))
// });

// let cityOneValue= localStorage.getItem("cities") /// retrieve array from the local storage
// let localStorageArray = JSON.parse(localStorage.getItem("cities"))
// cities = JSON.parse(cityOneValue); /// parse the arrray from the string

// $("#city-1 button").val(cityOneValue)
// console.log(cityOneValue);

// let localStorageArray = JSON.parse(localStorage.getItem("cities"))
// $("#city-1 button").val(localStorageArray[0])

        // button[i].addEventListener("click", function () {
        //     let data = buttons[i].dataset;

        // })     
        




//This is ny testing function for all the fetchs.  DO NOT DELETE UNTIL THE END
// function testingFunction() {
//     console.log(lat, lon);
//     let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&limit=1&units=metric&appid=" + apiKey;
//     fetch(forecastURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             console.log(response);
//             for (var i = 4; i < response.list.length; i += 8) {
//                 console.log('hello')
//                 console.log(response.list[i].dt_txt);
//             }
//         });

// }
