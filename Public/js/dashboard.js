const mainEl = document.getElementById('main');
window.onload = async function(){
    await renderPostList();
}

async function renderPostList(){
    const posts = await getUserPosts(main.dataset.user);
    const postListEl = document.getElementById('postList');
    for(let post of posts){
        const articleEl = document.createElement('article');
        const titleEl = document.createElement('h3');
        const deleteLink = document.createElement('span');

        titleEl.innerText = post.title;
        deleteLink.innerText = 'Delete';
        deleteLink.classList.add('nav-link');
        deleteLink.id = 'delete-' + post.id;

        articleEl.appendChild(titleEl);
        articleEl.appendChild(deleteLink);

        postListEl.appendChild(articleEl);

        titleEl.addEventListener('click', async function(){
            await renderFocusedPost(post);
        });
        deleteLink.addEventListener('click', async function(){
            await deletePost(post.id);
            await renderPostList();
        });
    }
}

function renderFocusedPost(post){
    const postFocusEl = document.getElementById('postFocus');
    const postEl = document.createElement('article');
    const titleDiv = document.createElement('div');
    const titleEl = document.createElement('h3');
    const updateTitleLink = document.createElement('span');
    const contentDiv = document.createElement('div');
    const contentEl = document.createElement('p');
    const updateContentLink = document.createElement('span');

    titleEl.innerText = post.title;
    contentEl.innerText = post.content;
    contentEl.classList.add('content');

    updateTitleLink.classList.add('nav-link');
    updateContentLink.classList.add('nav-link');
    updateTitleLink.innerText = 'Update';
    updateContentLink.innerText = 'Update';

    titleDiv.appendChild(titleEl);
    titleDiv.appendChild(updateTitleLink);
    contentDiv.appendChild(contentEl);
    contentDiv.appendChild(updateContentLink);

    postEl.appendChild(titleDiv);
    postEl.appendChild(contentDiv);
    postFocusEl.appendChild(postEl);

    updateTitleLink.addEventListener('click', async function(){
        await updateTitle(post, titleDiv); 
    });

    updateContentLink.addEventListener('click', async function(){
        await updateContent(post, contentDiv);
    });
}

async function updateTitle(post, titleDiv){

}
async function updateContent(post, contentDiv){

}

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