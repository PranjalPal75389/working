
search.addEventListener("click", searchWeather(inputCityName));

function searchWeather() {
    const inputCityName = document.getElementById("inputCityName");
    const search = document.getElementById("search-img")

    city_name = inputCityName.value;
    checkWeather();
    async function checkWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=0a201b3507ffd904a0ee589f4d533a2c`);
        var data = await response.json();
        console.log(data);
        document.querySelector(".cityName").innerHTML = data.name;
        document.getElementById("temp").innerHTML = data.main.temp + "°C";
        document.getElementById("humidity").innerText = data.main.humidity+"%";
        document.getElementById("windSpeed").textContent = data.wind.speed + "Km/h";
    }


    // document.querySelector("img").src = ""

}