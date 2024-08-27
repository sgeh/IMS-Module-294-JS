
function setColor() {
    const colorField = document.querySelector("#color-input");
    let color = colorField.value;

    // erweiterte Anforderungen
    if (color === "") {
        color = prompt("Bitte Farbe eingeben:");
        if (color === "" || color === null) {
            alert("Keine Farbe eingegeben!");
            color = "white";
        }
        colorField.value = color;
    }

    document.body.style.backgroundColor = color;
}
