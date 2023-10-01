/**
 * loginFormHandler
 * @param {event} event 
 * 
 * Takes the values of Email and Password.
 * Checks to see if it's a valid user.
 * If it is, then they are logged in and redirected to home.
 * Otherwise an error message appears for 2.5 seconds.
 */
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const error = document.getElementById('loginError');

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.location.replace('/');
        }
        else {
            error.innerText = "Failed to login."
            setTimeout(() => {
                error.innerText = '';
            }, 2500);
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

document.getElementById('loginForm').addEventListener('submit', loginFormHandler);