async function getWeatherForecast() {
    const lat = '47.229890';
    const lon = '8.856050';
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

function displayForecastData(data) {
    // TODO: implementieren Sie hier Ihre Logik für die Darstellung der Daten aus der API. 
    console.log(data); // Ausgabe der Daten auf der Entwicklerkonsole    
}

function displayError(error) {
    // TODO: (Zusatzaufgabe) implementieren Sie hier die Fehlerbehandlung.
    console.error(error);
}

getWeatherForecast();