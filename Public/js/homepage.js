let posts = new Array();

window.onload = async function(){
    posts = await getAllPosts();
    await renderPosts();
}

async function getAllPosts() {
    const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });
    if(!response.ok){
        return;
    }
    return await response.json(); 
}

/**
 * <article>
 *      <h3>title</h3>
 *      <p>content</p>
 *      <p>author - createdOn</p>
 * </article>
 */
async function renderPosts(){
    let postsSectionEl = document.getElementById('posts');
    for(let post of posts){
        const author = await getAuthor(post.author_id);
        let postEl = document.createElement('article');
        let titleEl = document.createElement('h3');
        let contentEl = document.createElement('p');
        let authorEl = document.createElement('p');
        titleEl.innerText = post.title;
        contentEl.innerText = post.content;
    }
}

async function getAuthor(id){
    const response = await fetch('/api/users/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });
}