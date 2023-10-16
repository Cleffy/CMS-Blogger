/**
 * registerFormHandler 
 * @param {event} event 
 * 
 * Tkaes the values of name, email, and password,
 * Creates a new user and logs them in.
 * Otherwise an error message appears for 2.5 seconds.
 */
async function registerFormHandler(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const error = document.getElementById('registerError');

    if(name && email && password) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/');
        }
        else {
            error.innerText = "Failed to register."
            setTimeout(() => {
                error.innerText = '';
            }, 2500);
        }
    }
    else{
        if(!name) {
            error.innerText = "Enter a name"
            setTimeout(() => {
                error.innerText = '';
            }, 2500);
        }
        if(!email) {
            error.innerText = "Enter an email"
            setTimeout(() => {
                error.innerText = '';
            }, 2500);
        }
        if(!password) {
            error.innerText = "Enter a password"
            setTimeout(() => {
                error.innerText = '';
            }, 2500);
        }
    }
}

// Event listener for the register form
document.getElementById('registerForm').addEventListener('submit', registerFormHandler);
// Event listener for the back button
document.getElementById('registerBackButton').addEventListener('click', () => {
    document.location.replace('/');
});