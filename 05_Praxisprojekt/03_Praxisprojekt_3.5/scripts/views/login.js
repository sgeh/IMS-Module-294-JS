async function submitLoginForm(e) {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    try {
        const loginInfo = await login(email, password);
        if (loginInfo.jwt !== undefined) {
            localStorage.setItem('jwt-token', loginInfo.jwt);
            window.location.href = '../index.html';
        }
        else {
            document.querySelector('#login-error').innerText = 'Login Failed.';
        }
    }
    catch (err) {
        document.querySelector('#login-error').innerText = err.message;
    }
}

document.querySelector('form').addEventListener('submit', submitLoginForm);