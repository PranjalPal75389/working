    const inputCityName = document.getElementById("inputCityName");
    const search = document.getElementById("search-img")

function searchWeather() {
    let city_name = inputCityName.value ? inputCityName.value : "mumbai";
    checkWeather();
    async function checkWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=0a201b3507ffd904a0ee589f4d533a2c`);
        var data = await response.json();
        console.log(data);
        document.querySelector(".cityName").innerHTML = data.name ? data.name : "No city found";
        document.getElementById("temp").innerHTML = data.main  ? data.main.temp + "°C" : "-°C";
        document.getElementById("humidity").innerText = data.main ? data.main.humidity + "%" : "-%";
        document.getElementById("windSpeed").textContent = data.wind  ? data.wind.speed + " Km/h" : "- Km/h";
        inputCityName.value ="";
    }
}
search.addEventListener("click", searchWeather(inputCityName));
window.document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchWeather(inputCityName);
    }
})