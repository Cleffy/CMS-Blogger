async function createPostFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title-createPost').value.trim();
    const content = document.querySelector('#content-createPost').value.trim();
    const userID = document.querySelector('#userID-createPost').value.trim();
    const error = document.querySelector('#error-createPost');

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
            }, 5000);
        }
    }
    else{
        if(!title) {
            error.value = "Enter a title"
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
        if(!content) {
            error.value = "Enter content"
            setTimeout(() => {
                error.value = '';
            }, 5000);
        }
    }
}

document.querySelector('.createPost-form').addEventListener('submit', createPostFormHandler);