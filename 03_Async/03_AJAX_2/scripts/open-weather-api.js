async function fetchWeatherData() {
    const appId = 'YOUR_API_KEY'; // get API Key from www.openweathermap.org
    const lat = '47.2266';
    const lon = '8.8184';
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` 
        + `${lat}&lon=${lon}`
        + `&units=metric&appid=${appId}`);
    const data = await response.json();
    displayData(data);
}


function displayData(data) {
    document.querySelector("#location").innerText = data.name;
    document.querySelector("#temperature").innerText = data.main.temp;

    // advanced solution
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    document.querySelector("#sunrise").innerText = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
    document.querySelector("#sunset").innerText = `${sunset.getHours()}:${sunset.getMinutes()}`
}

fetchWeatherData();