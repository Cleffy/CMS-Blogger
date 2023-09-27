async function getAllPosts(){
    const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return response;
    }
}