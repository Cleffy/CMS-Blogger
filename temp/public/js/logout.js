/**
 * logoutHandler
 * Logs the user out and goes to home
 */
async function logoutHandler() {
const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/');
    }
}

document.getElementById('logout').addEventListener('click', logoutHandler);