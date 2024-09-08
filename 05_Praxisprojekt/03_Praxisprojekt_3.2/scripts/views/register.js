async function submitRegisterForm(e) {
    e.preventDefault();

    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;
    const passwordConfirm = document.querySelector('#register-password-confirm').value;
    
    if (password === passwordConfirm) {
        try {
            const loginInfo = await register(email, password);
            localStorage.setItem('jwt-token', loginInfo.jwt);
            window.location.href = '../index.html';
        }
        catch (err) {
            document.querySelector('#register-error').innerText = err.message;
        }
    }
    else {
        document.querySelector('#register-error').innerText = "Password confirmation didn't match.";
    }
}

document.querySelector('form').addEventListener('submit', submitRegisterForm);