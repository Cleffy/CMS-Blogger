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
 * </article>
 */
async function renderPosts(){
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
        let commentEl = document.createElement('div');
        contentEl.classList.add('content');
        titleEl.innerText = post.title;
        contentEl.innerText = post.content;
        authorEl.innerText = `Created by ${author} on ${post.created_at}`;
        commentEl.innerHTML = `{{if logged_in}}<span class="nav-link" id="post-${post.id}">Comment</span>{{/if}}`;
        postEl.appendChild(titleEl);
        postEl.appendChild(contentEl);
        postEl.appendChild(authorEl);
        postsSectionEl.appendChild(postEl);
        commentLink = document.getElementById('post-' + post.id);
        if(commentLink) {
            commentLink.addEventListener('click', function(){
                addCommentForm(post.id, postEl);
            });
        }
        await renderComments(post.id, postEl);
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
    for(let comment of comments){
        const author = await getAuthor(comment.author_id);
        let commentEl = document.createElement('div');
        let contentEl = document.createElement('p');
        let authorEl = document.createElement('p');
        commentEl.classList.add('comment');
        contentEl.classList.add('content');
        contentEl.innerText = comment.content;
        authorEl.innerText = `Created by ${author} on ${comment.created_at}`;
        postEl.appendChild(commentEl);
        commentEl.appendChild(contentEl);
        commentEl.appendChild(authorEl);
    }
}