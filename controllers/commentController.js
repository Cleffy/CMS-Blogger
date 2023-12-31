const { Comment } = require('../models');

/**
 * @function createComment
 * @param {TEXT} content - content of post
 * @param {INT} userID - User ID of author
 * @param {INT} postID - User ID of author
 * @returns created comment data
 */
async function createComment(content, userID, postID){
    try {
        return await Comment.create(
            {
                content: content,
                author_id: userID,
                post_id: postID
            }
        );
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error creating Comment'
            });
    }
}

/**
 * @function getPostComments
 * @param {INT} id - id of Post
 * @returns Comment data
 */
async function getPostComments(id){
    try {
        const CommentData = await Comment.findAll(
            {
                where: { post_id: id }
            });
        if(!CommentData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Comments do not exist'
                });
        }

        return CommentData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting comments'
            });
    }
}
/**
 * @function getUserComments
 * @param {INT} id - id of User
 * @returns Comment data
 */
async function getUserComments(id){
    try {
        const CommentData = await Comment.findAll(
            {
                where: { user_id: id }
            });
        if(!CommentData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Comments do not exist'
                });
        }

        return CommentData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting comments'
            });
    }
}


/**
 * @function getComment
 * @param {INT} id - id of Comment
 * @returns Comment data
 */
async function getComment(id){
    try {
        const CommentData = await Comment.findOne(
            {
                where: { id: id }
            });
        if(!CommentData) {
            return Promise.resolve(
                {
                    status: 400,
                    message: 'Comment does not exist'
                });
        }

        return CommentData;
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error getting a comment'
            });
    }
}

/**
 * @function deleteComment
 * @param {INT} id - ID of comment
 * @returns Status
 */
async function deleteComment(id){
    try {
        await Post.destroy(
            {
                where: { id: id }
            }
        );
        return Promise.resolve(
            {
                status: 200,
                message: 'Deleted comment'
            }
        );
    }
    catch(error) {
        console.error(error);
        return Promise.resolve(
            {
                status: 500,
                message: 'Error deleting comment'
            });
    }
}

module.exports = { createComment, getComment, getPostComments, getUserComments, deleteComment };