const inputData = document.querySelector('input');
const search = document.querySelector('button');
const weatherImage = document.querySelector('.weather-image');
const loader = document.querySelector(".loader");
const weatherInfo = document.querySelector(".weather-info");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const temperature = document.querySelector(".temperature");
const place = document.querySelector(".place");
const humidity = document.querySelector('#humidity-value');
const wind = document.querySelector('#wind-value');
let city;

search.onclick = () => {
    if (inputData.value) {
        displayLoading();
        city = inputData.value;
        inputData.value = "";
        getWeather(city)
            .then((response) => {
                console.log(response)
                setTimeout(() => {
                    displayWeatherInfo();
                    updateDom(response)
                }, 500)

            });
    } else {
        alert("Please enter a city name")
    }
}

async function getWeather(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d91b45f3c4f0937454303d3f18b7d380`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error)
    }
};

function getDate(unix_timestamp) {
    var newDate = new Date(unix_timestamp * 1000);
    const today = newDate.toLocaleDateString('en-us', { weekday: 'long' });
    const month = newDate.toLocaleDateString('en-us', { month: 'long' });
    const todayDate = newDate.getDate();
    date.textContent = today + ', ' + month + " " + todayDate;
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    updateWeatherImage(hours);
    time.textContent = timeFormat(hours , minutes);
    // new DateTime("now", new DateTimeZone("chennai"));
}
function updateWeatherImage(hour) {
    if (hour >= 6 && hour <= 18) {
        weatherImage.src = "./images/sun.png";
    } else {
        weatherImage.src = "./images/moon.png";
    }
}
function displayLoading() {
    loader.classList.remove('hide');
    weatherInfo.classList.add('hide');
}
function displayWeatherInfo() {
    loader.classList.add('hide');
    weatherInfo.classList.remove('hide');
}
function kelvinToCelsius(kelvin) {
    const celcius = Math.floor(kelvin - 273.15)
    return celcius + " °C";
}
function kelvinToFahrenheit(kelvin) {
    const fahrenheit  = Math.floor((kelvin * 9 / 5) - 459.67)
    return fahrenheit + " °F";
}
function timeFormat(hour , minutes){
    let hourNow = hour
    if(hour >= 13 && hour <= 23){
        hourNow = hour - 12;
    } 
    
    if(hourNow/10 < 1){
        hourNow = "0" + hourNow;
    } 
    if(minutes/10 < 1){
        minutes = "0" + minutes;
    }
    if(hour >= 13 && hour <= 23){
        return hour-12 +  " : " + minutes + " pm";
    } else {
        return hour +  " : " + minutes + " am";
    }

}
function hourFormatConverter(hour){
}

function updateDom(data) {

    temperature.innerHTML = kelvinToCelsius(data.main.temp);
    place.innerHTML = city;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " mph";
    getDate(data.dt);

}
