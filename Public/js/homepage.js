const mainEl = document.getElementById('main');
window.onload = async function(){
    await renderPosts();
}

/**
 * getAllPosts
 * @returns All posts on database
 */
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
 * getPostComments
 * @returns All posts on database
 */
async function getPostComments(id) {
    const response = await fetch('/api/comments/posts/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });
    if(!response.ok){
        return;
    }
    return await response.json(); 
}


/**
 * getAuthor
 * @param {int} id 
 * @returns author's name
 */
async function getAuthor(id){
    const response = await fetch('/api/users/name/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' }
    });
    if(!response.ok){
        return;
    }
    return await response.json();
}
/**
 * renderPosts
 * Removes what is currently in the html section
 * Adds posts to section
 * <article>
 *      <h3>title</h3>
 *      <p>content</p>
 *      <p>author - createdOn</p>
 *      <span>Comment</span> -- If Logged In
 * </article>
 */
async function renderPosts(){
    const loggedIn = mainEl.dataset.logged;
    const posts = await getAllPosts();
    posts.reverse();
    let postsSectionEl = document.getElementById('posts');
    postsSectionEl.innerText = '';
    for(let post of posts){
        const author = await getAuthor(post.author_id);
        let postEl = document.createElement('article');
        let titleEl = document.createElement('h3');
        let contentEl = document.createElement('p');
        let authorEl = document.createElement('p');
        contentEl.classList.add('content')
        titleEl.innerText = post.title;
        contentEl.innerText = post.content;
        authorEl.innerText = `Created by ${author} on ${post.created_at}`;
        
        postEl.appendChild(titleEl);
        postEl.appendChild(contentEl);
        postEl.appendChild(authorEl);

        if(loggedIn) {
            addCommentButton(post.id, postEl);
        }
        addExpandButton(post.id, postEl);
        postsSectionEl.appendChild(postEl);
    }
}

/**
 * renderComments
 * @param {Int} postID reference to post
 * @param {Element} postEl Element to add comments
 * 
 * <div class='comment'>
 *      <p>content </p>
 *      <p>author - createdOn</p>
 * </div>
 */
async function renderComments(postID, postEl){
    const comments = await getPostComments(postID);
    let commentEl = document.createElement('div');
    commentEl.classList.add('comment');
    for(let comment of comments){
        const author = await getAuthor(comment.author_id);
        let contentEl = document.createElement('p');
        let authorEl = document.createElement('p');
        contentEl.classList.add('content');
        contentEl.innerText = comment.content;
        authorEl.innerText = `Created by ${author} on ${comment.created_at}`;
        commentEl.appendChild(contentEl);
        commentEl.appendChild(authorEl);
    }
    let collapseLink = document.createElement('span');
    collapseLink.classList.add('nav-link');
    collapseLink.id = `collapse-${postID}`;
    collapseLink.innerText = 'Collapse';
    postEl.appendChild(commentEl);
    postEl.appendChild(collapseLink);

    collapseLink.addEventListener('click', async function(event) {
        event.preventDefault();

        commentEl.remove();
        collapseLink.remove();
        addExpandButton(postID, postEl);
    });
}

/**
 * addCommentForm
 * @param {INT} postID 
 * @param {Element} postEl 
 * 
 * <form>
 *      <input type="text" id="comment{{postID}}"
 * </form>
 */
function addCommentForm(postID, postEl) {
    let formEl = document.createElement('form');
    let inputEl = document.createElement('input');
    let submitBtn = document.createElement('button');
    let cancelBtn = document.createElement('button');
    inputEl.type = 'text';
    inputEl.id = `comment${postID}`;
    submitBtn.type = 'submit';
    submitBtn.innerText = 'Add';
    cancelBtn.type = 'button';
    cancelBtn.innerText = 'X';
    formEl.appendChild(inputEl);
    formEl.appendChild(submitBtn);
    formEl.appendChild(cancelBtn);
    postEl.appendChild(formEl);

    //event listener to submit a comment
    formEl.addEventListener('submit', async function(event) {
        event.preventDefault();

        let content = inputEl.value.trim();
        if(content.length > 0){
            const userID = mainEl.dataset.user;
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ content, userID, postID }),
                headers: { 'Content-Type': 'application/json' }
            });
            if(response.ok) {
                document.location.replace('/');
            }
        }
    });

    //event listener to cancel a comment
    cancelBtn.addEventListener('click', function(event) {
        event.preventDefault();

        formEl.remove();
        addCommentButton(postID, postEl);
    });
}

/**
 * addCommentButton
 * @param {INT} postID - ID of post
 * @param {ELEMENT} postEl - DOM Element of post
 * 
 * creates a comment button
 */
function addCommentButton(postID, postEl) {
    let commentLink = document.createElement('span');
        commentLink.classList.add('nav-link');
        commentLink.id = `post-${postID}`;
        commentLink.innerText = 'Comment';
        postEl.appendChild(commentLink);
        
        //Event Listener to add comment form
        commentLink.addEventListener('click', function(event) {
            event.preventDefault();

            addCommentForm(postID, postEl);
            commentLink.remove();
        });
}

function addExpandButton(postID, postEl) {
    let expandLink = document.createElement('span');
    expandLink.classList.add('nav-link');
    expandLink.id = `expand-${postID}`;
    expandLink.innerText = 'Expand';
    postEl.appendChild(expandLink);

    //Event Listener to expand comments
    expandLink.addEventListener('click', async function(event) {
        event.preventDefault();
        await renderComments(postID, postEl);
        expandLink.remove();
    });
}