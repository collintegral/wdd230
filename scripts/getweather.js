const currentTemp = document.querySelector("#current-temp");
const tempIcon = document.querySelector("#temp-icon");
const tempDesc = document.querySelector("temp-desc");

const yorkLat = 39.96, yorkLon = 76.72;
const appKey = "59f8acb8bb178ff756f9f9ce77f00de6";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${yorkLat}&lon=${yorkLon}&units=imperial&appid=${appKey}`;

async function getWeather(weatherUrl) {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    tempIcon.alt = data.weather[0].description;
    tempIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    tempDesc.textContent = data.weather[0].description;
}