const hamButton = document.querySelector('#menu');
const bannerClose = document.querySelector('#banner-close');
const inviteBanner = document.querySelector('.invite-banner');
const navigation = document.querySelector('nav');
const weatherCard = document.querySelector('.weather');
const spotlightCard = document.querySelector('.company-spotlight');
const companySource = "data/directory.json"

const yorkLat = 39.96, yorkLon = 76.72;
const appKey = "59f8acb8bb178ff756f9f9ce77f00de6";
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${yorkLat}&lon=${yorkLon}&units=imperial&appid=${appKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${yorkLat}&lon=${yorkLon}&units=imperial&cnt=24&appid=${appKey}`;

const today = new Date();
const later = new Date();
todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getDate()}`;
later.setDate(later.getDate() + 1);


hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

bannerClose.addEventListener('click', () => {
	inviteBanner.classList.toggle('not-displayed');
})

if (![1,2,3].includes(today.getDay())) {
	inviteBanner.classList.toggle('not-displayed');
}

async function getWeather(weatherUrl, forecastUrl) {
	let weatherDates = [];

    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
			weatherDates.push([todayDate, data.main.temp, data.weather[0].icon, data.weather[0].description]);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }

	try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
			aggregateForecast(data.list).forEach(forecast => {
				weatherDates.push(forecast);
			});
            displayWeather(weatherDates);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayWeather(weatherData) {
	let forecastDiv = document.createElement('div');
		forecastDiv.classList.add('forecast');

	weatherData.forEach((date, ind) => {
		let weatherDiv = document.createElement('div');

		let weatherDate = document.createElement('h4');
		weatherDate.textContent = `${date[0].split("-")[1]}/${date[0].split("-")[2]}`;
		weatherDiv.appendChild(weatherDate);

		let weatherTemp = document.createElement('p');
		weatherTemp.textContent = `${Math.round(date[1])}°F`;
		weatherDiv.appendChild(weatherTemp);

		let weatherIcon = document.createElement('img');
		weatherIcon.src = `http://openweathermap.org/img/wn/${date[2]}.png`;
		weatherIcon.alt = date[3];
		weatherDiv.appendChild(weatherIcon);

		if (ind == 0) {
			let weatherDesc = document.createElement('span');
			weatherDesc.textContent = date[3];
			weatherDiv.appendChild(weatherDesc);

			weatherDiv.classList.add('currentW');
			weatherCard.appendChild(weatherDiv);
		}
		else {
			weatherDiv.classList.add('forecastW');
			forecastDiv.appendChild(weatherDiv);
		}
	});

	weatherCard.appendChild(forecastDiv);
}

function aggregateForecast(dates) {
	let aggregate = [];
	let testTemp = 0;
	let weatherIcon = null;
	let testDate = `${later.getFullYear()}-${String(later.getMonth() + 1).padStart(2, "0")}-${later.getDate()}`;

	dates.forEach((entry, ind) => {
		checkDate = entry.dt_txt.split(" ")[0];
		if ( checkDate !== testDate || ind == dates.length - 1) {
			aggregate.push([testDate, testTemp, weatherIcon, weatherDesc]);

			testDate = checkDate;
			testTemp = entry.main.temp;
		}
		else if (entry.main.temp > testTemp) {
			testTemp = entry.main.temp;
			weatherIcon = entry.weather[0].icon;
			weatherDesc = entry.weather[0].description;
		}
	});

	return aggregate;
}

async function getBusinessData() {
    const response = await fetch(companySource);
    const data = await response.json();
    getMemberSpotlight(data.companies);
}

function getMemberSpotlight(companies) {
	spotlightDiv = document.createElement('div');

	let goldMembers = companies.filter(company => company.memblevel == 3);
	let chosenGold = goldMembers[Math.floor(Math.random() * goldMembers.length)];
	
	spotlightDiv.appendChild(displayMember(chosenGold));
	companies = companies.filter(company => company !== chosenGold);
	
	let cardCount = 1;
	do {
		let chosenMember = companies[Math.floor(Math.random() * companies.length)];
		companies = companies.filter(company => company !== chosenMember);

		spotlightDiv.appendChild(displayMember(chosenMember));
		cardCount = cardCount + 1;
	} while (cardCount < 3);
	
	spotlightCard.appendChild(spotlightDiv);
}

function displayMember(memberArr) {
	companyDiv = document.createElement('div');

	companyName = document.createElement('h4');
	companyName.textContent = memberArr.name;
	companyDiv.appendChild(companyName);

	companyLogo = document.createElement('img');
	companyLogo.src = `images/${memberArr.icon}`;
	companyLogo.alt = `${memberArr.name} Logo`;
	companyLogo.width = 100;
	companyLogo.height = 50;
	companyDiv.appendChild(companyLogo);

	companyPhone = document.createElement('p');
	companyPhone.textContent = memberArr.phone;
	companyDiv.appendChild(companyPhone);

	companyUrl = document.createElement('a');
	companyUrl.href = memberArr.weblink;
	companyUrl.textContent = memberArr.weblink;
	companyDiv.appendChild(companyUrl);

	return companyDiv;
}


getWeather(currentUrl, forecastUrl);
getBusinessData();


document.getElementById("lastmod").innerHTML = `Last Modified ${document.lastModified}`;