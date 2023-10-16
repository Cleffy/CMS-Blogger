const { Post } = require('../models');

/**
 * @function getPost
 * @param {INT} id - id of post
 * @returns post data
 */
async function getPost(id){
    try {
        const postData = await Post.findOne(
            {
                where: { id: id }
            });
        if(!postData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Post does not exist'
                });
        }

        return postData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting a post'
            });
    }
}

/**
 * @function getPosts
 * @returns All posts
 */
async function getAllPosts(){
    try {
        const postsData = await Post.findAll();
        if(!postsData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Posts do not exist'
                });
        }

        return postsData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting all posts'
            });
    }
}

/**
 * @function getUserPosts
 * @param {INT} userID - ID of user
 * @returns All posts by user
 */
async function getUserPosts(userID) {
    try {
        const postsData = await Post.findAll(
            {
                where: { author_id: userID }
            }
        );
        if(!postsData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Posts do not exist'
                });
        }

        return postsData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting user posts'
            });
    }
}

/**
 * @function createPost
 * @param {STRING} title - title of post
 * @param {TEXT} content - content of post
 * @param {INT} userID - User ID of author
 * @returns created post data
 */
async function createPost(title, content, userID){
    try {
        return await Post.create(
            {
                title: title,
                content: content,
                author_id: userID
            }
        );
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error creating post'
            });
    }
}

/**
 * @function deletePost
 * @param {INT} id - ID of post
 * @returns Status
 */
async function deletePost(id){
    try {
        const postData = await Post.destroy(
            {
                where: { id: id }
            }
        );
        return Promise.resolve(
            {
                status: 200,
                message: 'Deleted post'
            });
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error deleting post'
            });
    }
}

/**
 * @function updatePost
 * @param {INT} id - ID of post
 * @param {STRING} title - new title of post
 * @param {TEXT} content - new content of post
 * @returns Status
 */
async function updatePost(id, title, content){
    try {
        const postData = await Post.update(
            {
                title: title,
                content: content
            },
            { 
                where: { id: id }
            }
        );
        return Promise.resolve(
            {
                status: 200,
                message: 'Updated post'
            });
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error updating post'
            });
    }
}

module.exports = { getPost, getAllPosts, getUserPosts, createPost, deletePost, updatePost };