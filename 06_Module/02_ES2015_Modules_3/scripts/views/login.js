import { login } from '../users-api.js';

async function submitLoginForm(e) {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    try {
        const loginInfo = await login(email, password);
        localStorage.setItem('jwt-token', loginInfo.jwt);
        window.location.href = '../index.html';
    }
    catch (err) {
        document.querySelector('#login-error').innerText = err.message;
    }
}

document.querySelector('form').addEventListener('submit', submitLoginForm);