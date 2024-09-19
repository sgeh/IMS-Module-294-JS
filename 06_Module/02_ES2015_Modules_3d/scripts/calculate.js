import {add} from './add.js';

export function calculate() {
    const leftInput = document.querySelector('#left');
    const rightInput = document.querySelector('#right');
    const output = document.querySelector('#output');
    output.value = add(leftInput.valueAsNumber, rightInput.valueAsNumber);
}
