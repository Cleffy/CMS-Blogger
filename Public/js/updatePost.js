async function updatePostFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('#id-updatePost').value.trim();
    const title = document.querySelector('#title-updatePost').value.trim();
    const content = document.querySelector('#content-updatePost').value.trim();
    const error = document.querySelector('#error-updatePost');

    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'PUT',
            body: JSON.stringify({ id, title, content }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            error.value = "Failed to update post"
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

async function getPost(id){
    const response = await fetch('/api/posts/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return response;
    }
}

document.querySelector('.updatePost-form').addEventListener('submit', updatePostFormHandler);