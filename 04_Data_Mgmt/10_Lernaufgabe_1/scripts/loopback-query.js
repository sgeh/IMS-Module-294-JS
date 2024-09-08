async function postData(bodyData) {
    try {
        const response = await fetch(`http://localhost:4200/api/loopback`, {
            method: 'POST',	
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },	
            body: bodyData
        } );
        const data = await response.json(); // warten, bis JSON Daten bereit
        displayData(data);
    }
    catch (error) {
        displayError(error);
    }
}

const displayData = function(data) {
    document.querySelector("#result").innerText = JSON.stringify(data);
}

const displayError = (error) => {
    console.error(error);
}

document.querySelector("form").addEventListener("submit", (e) => {
    postData(document.querySelector("#body-data").value);
    e.preventDefault();
});
