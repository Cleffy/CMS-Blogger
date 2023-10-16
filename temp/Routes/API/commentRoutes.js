const router = require('express').Router();
const { 
    createComment,
    getComment, 
    getPostComments, 
    getUserComments, 
    deleteComment 
} = require('../../Controllers/commentController');


/**
 * Create Comment
 * request.body
 * {
 *      content: ,
 *      userID: ,
 *      postID
 * }
 */
router.post('/', async (request, response) => {
    try {
        const commentData = await createComment(
            request.body.content,
            request.body.userID,
            request.body.postID
        );
        if(commentData.status == 500) {
            response
                .status(commentData.status)
                .json({message: commentData.message});
            return;
        }
        response
            .status(200)
            .json(commentData);
    }
    catch(error) {
        console.error(error);
        response
            .status(500)
            .json(error);
    }
});

/**
 * Get Comment
 * request.params
 *      id - Comment ID
 */
router.get('/single/:id', async (request, response) => {
    try {
        const commentData = await getComment(request.params.id);
        if(commentData.status == 400 || commentData.status == 500) {
            response
                .status(commentData.status)
                .json({message: commentData.message});
            return;
        }
        response
            .status(200)
            .json(commentData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get Post's Comments
 * request.params
 *      id - User ID
 */
router.get('/posts/:id', async (request, response) => {
    try {
        const commentData = await getPostComments(request.params.id);
        if(commentData.status == 400 || commentData.status == 500) {
            response
                .status(commentData.status)
                .json({message: commentData.message});
            return;
        }
        response
            .status(200)
            .json(commentData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get User's Comments
 * request.params
 *      id - User ID
 */
router.get('/users/:id', async (request, response) => {
    try {
        const commentData = await getUserComments(request.params.id);
        if(commentData.status == 400 || commentData.status == 500) {
            response
                .status(commentData.status)
                .json({message: commentData.message});
            return;
        }
        response
            .status(200)
            .json(commentData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Delete Comment
 * request.params
 *      id - Comment ID
 */
router.delete('/:id', async (request, response) => {
    try {
        return await deleteComment(request.params.id);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

module.exports = router;