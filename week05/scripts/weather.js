const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const trierLat = 49.75, trierLong = 6.64;
const appKey = "59f8acb8bb178ff756f9f9ce77f00de6";

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${appKey}&units=imperial`;
const trierSuffix = `&lat=${trierLat}&lon=${trierLong}`;

async function getWeatherData(weatherUrl) {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
        displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    } 
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    weatherIcon.alt = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    captionDesc.textContent = data.weather[0].description;
}

getWeatherData(`${url}${trierSuffix}`);