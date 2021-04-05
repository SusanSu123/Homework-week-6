var searchHistoryUl = $('#search-history');
var searchBtn = $('#fa-search');
var myCity = $('#city-name');
var searchInput = $('#search-input');

/*side bar*/
var searchedCities = [];

function renderSearchedCities() {
    searchInput.innerHTML = "";

    for (var i = 0; i < searchedCities.length; i++) {
        var searchCity = searchedCities[i];

        var li = $('<li>');
        li.textContent = searchCity;
        li.setAttribute("data-index", i);

        searchHistoryUl.appendChild(li);
        li.appendChild(searchCity);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        searchedCities = storedCities;
    }
    renderSearchedCities();
}

function storeCity() {
    localStorage.setItem("cities", JSON.stringify(searchedCities));
}
 searchBth.on("click", function(event) {
     event.preventDefault();

 })

var myCityTemperature = $('#temperature');
var myCityHumidity = $('#humidity');
var myCityWindSpeed = $('#wind-speed');
var myCityUX = $('#ux-index');


function getApi() {
var requestURL = 'https://openweathermap.org/';

fetch(requestUrl)
 .then(function (response) {
     return response.json();
 })
.then(function (data) {

}
}




