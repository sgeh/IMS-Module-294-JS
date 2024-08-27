let tickCount = 0;

function tick() {
    const clockOutput = document.querySelector("#clock");
    const timerOutput = document.querySelector("#alert-message");
    const timerAlarmTime = document.querySelector("#alarm-time");

    // set clock
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
    // simple solution: clockOutput.value = `${hours}:${minutes}:${seconds}`;

    // advanced solution:
    const hoursWithLeadingZero = `${hours}`.padStart(2, '0');
    const minutesWithLeadingZero = `${minutes}`.padStart(2, '0');
    const secondsWithLeadingZero = `${seconds}`.padStart(2, '0');
    clockOutput.value = `${hoursWithLeadingZero}:${minutesWithLeadingZero}:${secondsWithLeadingZero}`;


    // check alarm clock
    const timeAsSeconds = milliToSeconds(new Date().getTime());
    const fieldAsSeconds = getGmtTimeFromField(timerAlarmTime.valueAsNumber);

    if (timeAsSeconds === fieldAsSeconds) {
        timerOutput.style.display = 'block';
    }
}

function milliToSeconds(time) {
    return Math.round(time / 1000) * 1000;
}

function getGmtTimeFromField(valueAsNumber) {
    if (!isNaN(valueAsNumber)) {
        const inputDate = new Date(valueAsNumber);
        return new Date(inputDate.toISOString().slice(0, -1)).getTime();
    }
    return -1;
}

window.setInterval(() => tick(), 1000);