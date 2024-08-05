// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// // fnc to render on ui
// function renderWhetherInfo(data) {
// 	let newPara = document.createElement("p");
// 	newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
// 	document.body.appendChild(newPara);
// }

// async function showWeather() {
// 	try {
// 		let city = "chennai";
// 		const response = await fetch(
// 			` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
// 		);
// 		const data = await response.json();
// 		console.log("whether data is :", data);
// 		renderWhetherInfo();
// 	} catch (e) {
// 		console.log("error fond", e);
// 	}
// }
// showWeather();

// //get wheather based on lat and long
// async function fetchWeatherDetails() {
// 	try {
// 		let latitude = 15.6333;
// 		let longitude = 18.333;
// 		const result = await fetch(
// 			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric;`
// 		);
// 		let data = await result.json();
// 		console.log("weather is", data);
// 		renderWhetherInfo(data);
// 	} catch (error) {
// 		console.log("error found", error);
// 	}
// }
// fetchWeatherDetails();

// PROJECT START:
const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weather-container');

const grantAccessContainer = document.querySelector(
	'.grant-location-container'
);
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-info-container');

// initial variables needs:
let oldTab = userTab;
const API_KEY = 'd1845658f92b31c64bd94f06f7188c9c';
oldTab.classList.add('current-tab');
getFromSessionStorage();

function switchTab(newTab) {
	if (newTab != oldTab) {
		oldTab.classList.remove('current-tab');
		oldTab = newTab;
		oldTab.classList.add('current-tab');

		if (!searchForm.classList.contains('active')) {
			// making searchform container visible if it is invisible
			userInfoContainer.classList.remove('active');
			grantAccessContainer.classList.remove('active');
			searchForm.classList.add('active');
		} else {
			// pehele search tab pr tha, ab your weather tab visible krna hai
			searchForm.classList.remove('active');
			userInfoContainer.classList.remove('active');
			/*your weather tab me ane ke baad weather show karna pdega so local
			 storage ke hiisab se cordinates ke base pe weather show kr dena*/
			getFromSessionStorage();
		}
	}
}

userTab.addEventListener('click', () => {
	// passed usertab as input parameter
	switchTab(userTab);
});

searchTab.addEventListener('click', () => {
	// passed searchtab as input parameter
	switchTab(searchTab);
});

// checkes if cordinates are present in sesion storage
function getFromSessionStorage() {
	const localCoordinates = sessionStorage.getItem('user-coordinates');
	if (!localCoordinates) {
		// if localCor doesnt exist:
		grantAccessContainer.classList.add('active');
	} else {
		const coordinates = JSON.parse(localCoordinates);
		fetchUserWeatherInfo(coordinates);
	}
}

async function fetchUserWeatherInfo(coordinates) {
	const { lat, lon } = coordinates;
	//make grnt container invisibe
	grantAccessContainer.classList.remove('active');
	// make loader visible
	loadingScreen.classList.add('active');
	//make api call
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		);
		const data = await res.json();
		//removing loader
		loadingScreen.classList.remove('active');
		//activate userinfocontainer
		userInfoContainer.classList.add('active');
		renderWeatherInfo(data);
	} catch (e) {
		loadingScreen.classList.remove('active');
		//hw
		console.log('cannot found weather information for your location', e);
	}
}

function renderWeatherInfo(weatherInfo) {
	//firstly we have to fetch the element
	const cityName = document.querySelector('[data-cityName]');
	const countryIcon = document.querySelector('[data-countryIcon]');
	const desc = document.querySelector('[data-weatherDesc]');
	const weatherIcon = document.querySelector('[data-weatherIcon]');
	const temp = document.querySelector('[data-temp]');
	const windspeed = document.querySelector('[ data-windSpeed]');
	const humidity = document.querySelector('[data-humidity]');
	const cloudiness = document.querySelector('[data-cloudiness]');

	// fetch values from weatherinfo objects and put it in ui elements
	cityName.textContent = weatherInfo?.name;
	countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
	desc.innerText = weatherInfo?.weather?.[0]?.description;
	weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
	temp.innerText = weatherInfo?.main?.temp;
	windspeed.innerText = weatherInfo?.wind?.speed;
	humidity.innerText = weatherInfo?.main?.humidity;
	cloudiness.innerText = weatherIcon?.clouds?.all;
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		// hw : show an elert for no geolocaton found
		alert('Geolocation not found');
	}
}

function showPosition(position) {
	const userCoordinates = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
	};
	sessionStorage.setItem('user-coordinates', JSON.stringify(userCoordinates));
	fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector('[data-grantAccess]');
grantAccessButton.addEventListener('click', getLocation);

const searchInput = document.querySelector('[data-searchInput]');

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let cityName = searchInput.value;
	if (searchInput.value === '') {
		return;
	} else {
		fetchSearchWeatherInfo(cityName);
	}
});

async function fetchSearchWeatherInfo(city) {
	loadingScreen.classList.add('active');
	userInfoContainer.classList.remove('active');
	grantAccessContainer.classList.remove('active');

	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
		);
		const data = await res.json();
		loadingScreen.classList.remove('active');
		userInfoContainer.classList.add('active');
		renderWeatherInfo(data);
	} catch (error) {
		// hw
		console.log('flag not found');
	}
}
