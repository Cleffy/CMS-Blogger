async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const error = document.querySelector('#error-login');

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/');
        }
        else {
            error.value = "Failed to login."
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
    }
    else{
        if(!email) {
            error.value = "Enter an email"
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
        if(!password) {
            error.value = "Enter a password"
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);