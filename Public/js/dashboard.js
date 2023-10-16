const mainEl = document.getElementById('main');
let postFocus = null;

/**
 * window.onload
 * When the window loads, draw the dashboard
 */
window.onload = async function(){
    await drawDashboard();
}

/**
 * drawDashboard
 * Refreshes the page with the current user's posts
 */
async function drawDashboard(){
    const posts = await getUserPosts(main.dataset.user);
    if(posts.length > 0){
        renderPostList(posts);
    }
    if(postFocus !== null){
        renderFocusedPost();
    }
    else{
        const postFocusEl = document.getElementById('postFocus');
        postFocusEl.style.display = 'none';
    }
}

/**
 * renderPostList
 * @param {array} posts 
 * Renders a list of post titles
 */
function renderPostList(posts){
    const postListEl = document.getElementById('postList');
    postListEl.innerHTML = '';
    for(let post of posts){
        const articleEl = document.createElement('article');
        const titleEl = document.createElement('h4');
        const deleteLink = document.createElement('span');

        titleEl.innerText = post.title;
        deleteLink.innerText = 'Delete';
        deleteLink.classList.add('nav-link');
        deleteLink.id = 'delete-' + post.id;

        articleEl.appendChild(titleEl);
        articleEl.appendChild(deleteLink);

        postListEl.appendChild(articleEl);

        if(postFocus === null || postFocus.id !== post.id){
            titleEl.addEventListener('click', async function(){
                postFocus = post;
                await drawDashboard();
            }, { once: true });
        }
        deleteLink.addEventListener('click', async function(){
            const response = await deletePost(post.id);
            await drawDashboard();
        });
    }
}

/**
 * renderFocusedPost
 * renders the post in focus
 */
function renderFocusedPost(){
    const postFocusEl = document.getElementById('postFocus');
    const postEl = document.createElement('article');
    const titleDiv = document.createElement('div');
    const titleEl = document.createElement('h3');
    const updateTitleLink = document.createElement('span');
    const contentDiv = document.createElement('div');
    const contentEl = document.createElement('p');
    const updateContentLink = document.createElement('span');

    postFocusEl.style.display = 'block';
    postFocusEl.innerHTML = '';
    titleEl.innerText = postFocus.title;
    contentEl.innerText = postFocus.content;
    contentEl.classList.add('content');

    updateTitleLink.classList.add('nav-link');
    updateContentLink.classList.add('nav-link');
    updateTitleLink.innerText = 'Update';
    updateContentLink.innerText = 'Update';

    contentDiv.setAttribute('id', 'contentDiv' + postFocus.id);
    titleDiv.setAttribute('id', 'titleDiv' + postFocus.id);

    titleDiv.appendChild(titleEl);
    titleDiv.appendChild(updateTitleLink);
    contentDiv.appendChild(contentEl);
    contentDiv.appendChild(updateContentLink);

    postEl.appendChild(titleDiv);
    postEl.appendChild(contentDiv);
    postFocusEl.appendChild(postEl);

    // Event listener to change a title
    updateTitleLink.addEventListener('click', function(){
        updateTitle(); 
    });

    // Event listener to change content
    updateContentLink.addEventListener('click', function(){
        updateContent();
    });
}

/**
 * updateTitle
 * updates the post in focus with the new title
 */
function updateTitle(){
    const titleDiv = document.getElementById('titleDiv' + postFocus.id);
    titleDiv.innerText = '';
    const inputEl = document.createElement('input');
    const updateLink = document.createElement('span');

    inputEl.value = postFocus.title;
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('id', 'title' + postFocus.id);
    updateLink.innerText = 'Update';
    updateLink.classList.add('nav-link');

    titleDiv.appendChild(inputEl);
    titleDiv.appendChild(updateLink);

    // Event listener to update the title
    updateLink.addEventListener('click', async function(){
        const title = document.getElementById('title' + postFocus.id).value;
        await updatePost(postFocus.id, title, postFocus.content);
        postFocus.title = title;
        await drawDashboard();
    });
}

/**
 * updateContent
 * updates the post in focus with the new content
 */
function updateContent(){
    const contentDiv = document.getElementById('contentDiv' + postFocus.id);
    contentDiv.innerText = '';
    const inputEl = document.createElement('textarea');
    const updateLink = document.createElement('span');

    inputEl.value = postFocus.content;
    inputEl.rows = 10;
    inputEl.cols = 50;
    inputEl.setAttribute('id', 'content' + postFocus.id);
    updateLink.innerText = 'Update';
    updateLink.classList.add('nav-link');

    contentDiv.appendChild(inputEl);
    contentDiv.appendChild(updateLink);

    // Event listener to update the content
    updateLink.addEventListener('click', async function(){
        const content = document.getElementById('content' + postFocus.id).value;
        await updatePost(postFocus.id, postFocus.title, content);
        postFocus.content = content;
        await drawDashboard();
    });
}

/**
 * getUserPosts
 * @param {int} id 
 * @returns returns an array of all posts by user with given id
 */
async function getUserPosts(id){
    const response = await fetch('/api/posts/users/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });

    if(response.ok){
        return await response.json();
    }
}

/**
 * deletePost
 * @param {int} id 
 * @returns promise
 * 
 * deletes post with given id - then returns a promise
 */
async function deletePost(id){
    if(postFocus !== null && postFocus.id === id){
        postFocus = null;
    }
    return await fetch('/api/posts/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application.json' }
    });
}

/**
 * updatePost
 * @param {int} id 
 * @param {string} title 
 * @param {text} content 
 * @returns promise
 * 
 * updates post with given id - then returns a promise
 */
async function updatePost(id, title, content){
    return await fetch('/api/posts/', {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title,
            content: content
        }),
        headers: { 'Content-Type': 'application/json' }
    });
}