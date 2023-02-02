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
let cityForecastEl = $('#city-forecast');
let displayForecastEl = $('#display-forecast');
let forecastCardEl = $("#forecast-card");


// To save the user's inputed city name for the currentWeather fetch
$("#city-form").on("submit", function (event) {   //id from form html
    event.preventDefault();

    //Grab the name of city searched
    var cityName = $("#city-input").val(); 
    console.log(cityName);  //checking to see if it is taking in data from the form

//Alerts the user if they have not entered in a city name 
    if (cityName === "" || cityName == null) {  
        //send alert if search input is empty when submitted
        alert("Please enter a city name");
        event.preventDefault();
    }
    else {
        //Clears the forecast cards that are created in the child node of the fiveDayFunction
        $("#forecast-card").empty();

        //Calls the currentWeather function 
        currentWeather(cityName);

        //Calls the buttons for previously searched cities 
        showCities(cityName)
    }
});

//Fetch is working for currentWeather to extract data for current day
function currentWeather(cityName) {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&units=metric&appid=" + apiKey;
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
            document.getElementById("city").innerHTML = cityName;
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
            forecastCardEl.empty();
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

                let today = dayjs(response.list[i].dt_txt);
                fiveDate.text(today.format('MMM D, YYYY'));
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
function showCities(cityName) {

    let arrayOfCities = JSON.parse(localStorage.getItem("cities")) || []

    // Preventing duplication of City names or Null values from being entered into the array
    if (cityName !== "" && !arrayOfCities.includes(cityName)) {
        arrayOfCities.push(cityName)
        localStorage.setItem("cities", JSON.stringify(arrayOfCities))
    }

    //Passing the function 
    loadPreviousCities();
};


///Pulls previously entered cities from local storage and creates a button for them

function loadPreviousCities() {
    let cityOneValue = localStorage.getItem("cities") /// retrieve array from the local storage
    console.log(cityOneValue);
    let localStorageArray = JSON.parse(localStorage.getItem("cities"))
    console.log("this localstorage", localStorageArray);
    var btnHTML = ""

    ///loop through the array of cities & create a buton via javascript for the city
    for (let i = 0; i < localStorageArray.length; i++) {
        var cityName = localStorageArray[i]
        btnHTML += `<button class="btn btn-primary " onclick="currentWeather('${cityName}')">${cityName}</button>` //template literal

    }
    //Adds the button to the page in the city-1 section of the page 
    $("#city-1").html(btnHTML)
}

loadPreviousCities();


