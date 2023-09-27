async function getUserPosts(id){
    const response = await fetch('/api/posts/users/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return response;
    }
}

async function deletePost(id){
    const response = await fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return response;
    }
}