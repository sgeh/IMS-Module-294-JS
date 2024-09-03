async function getWeatherForecast() {
    const lat = document.querySelector("#lat").value; // '47.229890';
    const lon = document.querySelector("#lon").value; // '8.856050';
    const appId = 'YOUR_API_KEY'; // fügen Sie hier Ihren API Key ein

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast` 
            + `?lat=${lat}&lon=${lon}`
            + `&units=metric&appid=${appId}`);
        const data = await response.json(); // warten, bis JSON Daten bereit
        displayForecastData(data); 
    }
    catch (error) {
        displayError(error);
    }
}

const displayForecastData = function(data) {
    const tbody = document.querySelector('#table-data');
    tbody.innerText = '';

    for (let row of data.list) {
        const tr = document.createElement('tr');

        const time = document.createElement('th');
        time.innerText = new Date(row.dt * 1000).toUTCString();
        tr.appendChild(time);

        const temp = document.createElement('td');
        temp.innerText = row.main.temp;
        tr.appendChild(temp);

        const weather = document.createElement('td');
        weather.innerText = row.weather[0].main;
        tr.appendChild(weather);

        const humidity = document.createElement('td');
        humidity.innerText = row.main.humidity;
        tr.appendChild(humidity);

        const wind = document.createElement('td');
        wind.innerText = row.wind.speed;
        tr.appendChild(wind);

        tbody.appendChild(tr);
    }
}

const displayError = (error) => {
    // TODO: (Zusatzaufgabe) implementieren Sie hier die Fehlerbehandlung.
    console.error(error);
}

document.querySelector("form").addEventListener("submit", (e) => {
    getWeatherForecast();
    e.preventDefault();
});
