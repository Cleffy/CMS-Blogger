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
    titleDiv.innerText = '';
    const formEl = document.createElement('form');
    const labelEl = document.createElement('label');
    const inputEl = document.createElement('input');
    const submitEl = document.createElement('button');

    formEl.classList.add('titleForm');
    labelEl.innerText = 'Title:';
    labelEl.setAttribute('for', 'title' + post.id);
    inputEl.value = post.title;
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('id', 'title' + post.id);
    submitEl.innerText = 'Update';
    submitEl.setAttribute('type', 'submit');

    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);

    titleDiv.appendChild(formEl);

    submitEl.addEventListener('submit', async function(event){
        event.preventDefault();
        const title = document.getElementById('title' + post.id).value;
        const response = await fetch('/api/posts/' + post.id, {
            method: 'PUT',
            body: JSON.stringify({ title }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok){
            await renderPostList();
            await renderFocusedPost(post);
        }
    });
}

async function updateContent(post, contentDiv){
    contentDiv.innerText = '';
    const formEl = document.createElement('form');
    const labelEl = document.createElement('label');
    const inputEl = document.createElement('input');
    const submitEl = document.createElement('button');

    formEl.classList.add('contentForm');
    labelEl.innerText = 'Content:';
    labelEl.setAttribute('for', 'content' + post.id);
    inputEl.value = post.content;
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('id', 'content' + post.id);
    submitEl.innerText = 'Update';
    submitEl.setAttribute('type', 'submit');

    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);

    contentDiv.appendChild(formEl);

    submitEl.addEventListener('submit', async function(event){
        event.preventDefault();
        const content = document.getElementById('content' + post.id).value;
        const response = await fetch('/api/posts/' + post.id, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok){
            await renderPostList();
            await renderFocusedPost(post);
        }
    });
}

async function getUserPosts(id){
    const response = await fetch('/api/posts/users/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return await response.json();
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