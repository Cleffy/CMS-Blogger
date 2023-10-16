const router = require('express').Router();
const { 
    getPost, 
    getAllPosts, 
    getUserPosts, 
    createPost, 
    deletePost, 
    updatePost 
} = require('../../controllers/postController')

/**
 * Create Post
 * request.body
 * {
 *      title: ,
 *      content: ,
 *      userID:
 * }
 */
router.post('/', async (request, response) => {
    try {
        const postData = await createPost(
            request.body.title,
            request.body.content,
            request.body.userID
        );
        if(postData.status == 500) {
            response
                .status(postData.status)
                .json({message: postData.message});
            return;
        }
        response
            .status(200)
            .json(postData);
    }
    catch(error) {
        response
            .status(500)
            .json(error);
    }
});

/**
 * Update Post
 * request.body
 * {
 *      id: ,
 *      title: ,
 *      content:
 * }
 */
router.put('/', async (request, response) => {
    try {
        const postData = await updatePost(
            request.body.id,
            request.body.title,
            request.body.content
        );
        response
            .status(postData.status)
            .json({message: postData.message});
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Delete Post
 * request.params
 *      id - Post ID
 */
router.delete('/:id', async (request, response) => {
    try {
        const postData =  await deletePost(request.params.id);
        response
            .status(postData.status)
            .json({message: postData.message});
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get Post
 * request.params
 *      id - Post ID
 */
router.get('/single/:id', async (request, response) => {
    try {
        const postData = await getPost(request.params.id);
        if(postData.status == 400 || postData.status == 500) {
            response
                .status(postData.status)
                .json({message: postData.message});
            return;
        }
        response
            .status(200)
            .json(postData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get All Posts
 */
router.get('/', async (request, response) => {
    try {
        const postData = await getAllPosts();
        if(postData.status == 400 || postData.status == 500) {
            response
                .status(postData.status)
                .json({message: postData.message});
            return;
        }
        response
            .status(200)
            .json(postData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get User's Posts
 * request.params
 *      id - User ID
 */
router.get('/users/:id', async (request, response) => {
    try {
        const postData = await getUserPosts(request.params.id);
        if(postData.status == 400 || postData.status == 500) {
            response
                .status(postData.status)
                .json({message: postData.message});
            return;
        }
        response
            .status(200)
            .json(postData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

module.exports = router;