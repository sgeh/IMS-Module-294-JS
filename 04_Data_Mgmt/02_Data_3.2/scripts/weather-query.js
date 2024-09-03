let localData = [ ];

async function getWeatherForecast() {
    const lat = document.querySelector("#lat").value; // '47.229890';
    const lon = document.querySelector("#lon").value; // '8.856050';
    const appId = 'YOUR_API_KEY'; // fügen Sie hier Ihren API Key ein

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast` 
            + `?lat=${lat}&lon=${lon}`
            + `&units=metric&appid=${appId}`);
        const data = await response.json(); // warten, bis JSON Daten bereit

        localData = data.list.map((row) => {
            return {
                time: new Date(row.dt * 1000).toUTCString(),
                temperature: row.main.temp,
                weather: row.weather[0].main,
                humidity: row.main.humidity,
                windSpeed: row.wind.speed
            };
        });
          
        displayForecastData(localData); 
    }
    catch (error) {
        displayError(error);
    }
}

const displayForecastData = function(data) {
    const tbody = document.querySelector('#table-data');
    let html = '';
    for (let row of data) {
        html += `<tr>
                    <th>${ row.time }</th>
                    <td>${ row.temperature }</td>
                    <td>${ row.weather }</td>
                    <td>${ row.humidity }</td>
                    <td>${ row.windSpeed }</td>
                </tr>`;
    }
    tbody.innerHTML = html;
}

const displayError = (error) => {
    // Zusatzaufgabe: implementieren Sie hier die Fehlerbehandlung.
    console.error(error);
}

document.querySelector("form").addEventListener("submit", (e) => {
    getWeatherForecast();

    document.querySelector("#apply-filter").addEventListener("click", () => {
        const humidity = document.querySelector("#humidity-filter").valueAsNumber;
        const filteredData = localData.filter((row) => row.humidity === humidity);
        displayForecastData(filteredData);
    });
    e.preventDefault();
});
