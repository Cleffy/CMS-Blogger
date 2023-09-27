async function registerFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const error = document.querySelector('#error-register');

    if(name && email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/')
        }
        else {
            error.value = "Failed to register."
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
    }
    else{
        if(!name) {
            error.value = "Enter a name"
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
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

document.querySelector('.register-form').addEventListener('submit', registerFormHandler);