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
    let html = '';
    for (let row of data.list) {
        html += `<tr>
                    <th>${ new Date(row.dt * 1000).toUTCString() }</th>
                    <td>${ row.main.temp }</td>
                    <td>${ row.weather[0].main }</td>
                    <td>${ row.main.humidity }</td>
                    <td>${ row.wind.speed }</td>
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
    e.preventDefault();
});
