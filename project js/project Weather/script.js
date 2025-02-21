const API_KEY = "4bac2002cc9258ea2ef1b8c769c40c0b";
const URL = `https://api.openweathermap.org/data/2.5/weather?lang=he&units=metric&appid=${API_KEY}&q=`;

const q = document.getElementById("inputCity");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const errorMessage = document.getElementById("errorMessage");

async function getWeather(city) {
    const response = await fetch(URL + city);
    const data = await response.json();

    showWeather(data);
}

function showWeather(data) {
    if (data.cod === "404") {
        errorMessage.innerText = "City not found ❌";
        h1.innerText = "";
        temp.innerText = "";
        description.innerText = "";
        weatherIcon.src = "";
        return;
    } else {
        temp.innerText = data.main.temp + "°C";
        h1.innerText = data.name;
        description.innerText = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        console.log(data);
    }
}
button.addEventListener("click", () => {
    try {
        getWeather(q.value);
    } catch (error) {

        alert("נתקלנו בבעיה אנה נסה שוב");
    }
});