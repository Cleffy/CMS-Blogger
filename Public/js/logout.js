async function logoutFormHandler(event) {
    event.preventDefault();

    const error = document.querySelector('#error-logout');

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/');
    }
    else {
        error.value = "Failed to logout."
        setTimeout(() => {
            error.value = '';
        }, 5000);
    }
}

document.querySelector('.logout-form').addEventListener('submit', logoutFormHandler);