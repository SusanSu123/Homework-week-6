var searchHistoryUl = $('#search-history');//sidebar
var searchBtn = $('#search-button');//sidebar
var searchInput = $('#search-input');//sidebar
var myCity = $('#city-name');//main
var temperature = $("#temperature")
var image = $('#weather-image')
var dateEl = $('#date_-alue');//main
var humidityEl = $('#humidity');//main
var windSpeed = $('#wind-speed');




/*side bar*/
var searchedCities = [];

function renderSearchedCities() {
    searchHistoryUl.text("") ;
   
    searchedCities.forEach(element => {
        var li = $("<li>")
        li.text(element);
        searchHistoryUl.append(li);        
    });
    }

function init() {
    var storedCities = localStorage.getItem("searchCity");
    if (!storedCities) {
        searchedCities = []
    }
    else{
        searchedCities = JSON.parse(storedCities)
    }
    renderSearchedCities();
}

function storeCity() {
    localStorage.setItem("cities", JSON.stringify(searchedCities));
}
 
/*current-weather*/
function getWeather() {
    var cityName = searchInput.val();
    var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9d8e1806744266054d5440d333faa166`;

    fetch (requestURL)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data){
        return renderWeather(data);
    })
    .catch(function (error){
        console.log(error)
    })
}
function renderWeather(data){
    myCity.text(data.name);
    temperature.text(" " + data.main.temp_max + " ℉");
    humidityEl.text(" " + data.main.humidity + " %");
    windSpeed.text(" " + data.wind.speed + " MPH");
    image.attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
}

/*5 day forecast*/

function getForecast() {
    var cityName = searchInput.val();
    var requestURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=9d8e1806744266054d5440d333faa166`;

    fetch (requestURL)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data){
        return renderForecast(data);
    })
    .catch(function (error){
        console.log(error)
    })
}

function renderForecast(data){

    var date_value = "";
    var temp = 0;
    var humidity = 0;
    var dateArray = [];
    var imgEl = "";
    var cardIndex = 1;
for (index = 0; index < data.list.length-1; index++) {
    var dateValue = new Date(data.list[index].dt_txt).toLocaleDateString();
if (!dateArray.includes(dateValue)) {
    dateArray.push(dateValue);
   
    temp = data.list[index].main.temp_max;
    humidity = data.list[index].main.humidity;

    var dateElm = $("#day" + (cardIndex) +"-title") ;
    dateElm.text(dateValue);

    imgEl.attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

    var tempEl = $("#day" + (cardIndex) +"-temp") ;
    tempEl.text("Temp: " +temp + " ℉")

    var humEl = $("#day" + (cardIndex) +"-humidity") ;
    humEl.text("Humidity: " +humidity + " %")

    var imgEl = $("#day" + (cardIndex) +"-img") ;

    
    cardIndex++;
}
}
}


searchBtn.on("click", function(event) {
    event.preventDefault();
    getWeather();
    getForecast();
    storeCities();

})

function storeCities(){

    var storedCities = localStorage.getItem("searchCity");
    if (!storedCities) {
        searchedCities = [searchInput.val()]
    }
    else{
        searchedCities = JSON.parse(storedCities)
        searchedCities.push(searchInput.val())
    }
    localStorage.setItem("searchCity",  JSON.stringify(searchedCities));
    renderSearchedCities();
    searchInput.text("");
}

document.addEventListener("load", init)

