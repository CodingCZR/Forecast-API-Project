document.addEventListener("DOMContentLoaded", () => {
    loadCity();
});

const cities = [
    {
        name: "New York",
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        name: "Los Angeles",
        latitude: 34.0522,
        longitude: -118.2437
    },
    {
        name: "Chicago",
        latitude: 41.8781,
        longitude: -87.6298
    },
    {
        name: "Houston",
        latitude: 29.7604,
        longitude: -95.3698
    },
    {
        name: "Miami",
        latitude: 25.7617,
        longitude: -80.1918
    }
];

function loadCity() {
    const selectCity = document.getElementById("city-select");
    
    cities.forEach(city => {
        const optionElement = document.createElement("option");
        optionElement.innerText = city.name;
        selectCity.appendChild(optionElement);
    }); 

    selectCity.addEventListener("change", () => {
        displayWeather(selectCity.value);
    });

    selectedCity = selectCity.value;
    displayWeather(selectedCity);
}

function displayWeather(selectedCity) {

    const selectedCityObject = cities.find(city => city.name === selectedCity);
    const latitude = selectedCityObject.latitude;
    const longitude = selectedCityObject.longitude;

    const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastURL = data.properties.forecast;
            getWeather(forecastURL);
        })
}

function getWeather(weatherUrl) {
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.properties.periods[0];
            const date = forecast.startTime;
            const temperature = forecast.temperature;
            const windSpeed = forecast.windSpeed;

            const dateCell = document.getElementById("weatherDate");
            const temperatureCell = document.getElementById("weatherTemp");
            const windSpeedCell = document.getElementById("weatherWind");

            dateCell.textContent = date;
            temperatureCell.textContent = temperature;
            windSpeedCell.textContent = windSpeed;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
