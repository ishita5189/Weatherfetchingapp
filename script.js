const apiKey = "20da423906ccf27bec8c2d81c8f4a2eb";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value.trim();
    if (cityValue) {
        getWeatherData(cityValue);
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found.");
        }

        const data = await response.json();
        updateWeatherData(data);
    } catch (err) {
        displayError(err.message);
    }
}

function updateWeatherData(data) {
    const temperature = Math.floor(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
        `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed} m/s`
    ];

    weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
    weatherDataEle.querySelector(".desc").textContent = description;
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

    weatherDataEle.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");
}

function displayError(message) {
    weatherDataEle.querySelector(".temp").textContent = "";
    imgIcon.innerHTML = "";
    weatherDataEle.querySelector(".desc").textContent = message;
    weatherDataEle.querySelector(".details").innerHTML = "";
}
