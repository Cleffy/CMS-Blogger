/**
 * createPostFormHandler
 * @param {event} event 
 * 
 * Takes the values of Title and Content.
 * Checks to see if it's a valid post.
 * If it is, then they are redirected to dashboard.
 * Otherwise an error message appears for 2.5 seconds.
 */
async function createPostFormHandler(event) {
    event.preventDefault();

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const error = document.getElementById('postError');
    const userID = main.dataset.user;

    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content, userID }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            error.value = "Failed to create post"
            setTimeout(() => {
                error.value = '';
            }, 2500);
        }
    }
    else{
        if(!title) {
            error.value = "Enter a title"
            setTimeout(() => {
                error.value = '';
            }, 2500);
        }
        if(!content) {
            error.value = "Enter content"
            setTimeout(() => {
                error.value = '';
            }, 2500);
        }
    }
}

// Event listener for the create post form
document.getElementById('createPost').addEventListener('submit', createPostFormHandler);
// Event listener for the back button
document.getElementById('postBackButton').addEventListener('click', () => {
    document.location.replace('/dashboard');
});