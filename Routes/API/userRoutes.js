const router = require('express').Router();
const { 
    userLogin, 
    createUser,
    getUserName 
} = require('../../Controllers/userController');

/**
 * User login
 * request.body
 * {
 *      email: ,
 *      password: 
 * }
 */
router.post('/login', async (request, response) => {
    try {
        const userData = await userLogin(request.body.email, request.body.password);
        if(userData.status == 400 || userData.status == 500) {
            response
                .status(userData.status)
                .json({message: userData.message});
            return;
        }
        request.session.save(() => {
            request.session.user_id = userData.isSoftDeleted;
            request.session.logged_in = true;

            response
                .status(200)
                .json(userData);
        });
    } 
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * User logout
 */
router.post('/logout', (request, response) => {
    try {
        if(request.session.logged_in) {
            request.session.destroy(() => {
                response.status(204).end();
            });
        }
        else {
            response.status(404).end()
        }
    }
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Create User
 * request.body
 * {
 *      name: ,
 *      email: ,
 *      password: 
 * }
 */
router.post('/register', async (request, response) => {
    try {
        const userData = await createUser(request.body.name, request.body.email, request.body.password);
        if(userData.status == 500) {
            response
                .status(userData.status)
                .json({message: userData.message});
            return;
        }
        request.session.save(() => {
            request.session.user_id = userData.isSoftDeleted;
            request.session.logged_in = true;

            response
                .status(200)
                .json(userData);
        });
    } 
    catch(error) {
        response.status(500).json(error);
    }
});

/**
 * Get user name
 * request.params
 *      id - User ID
 * Returns name of user
 */
router.get('/name/:id', async (request, response) => {
    try {
        const userData = await getUserName(request.params.id);
        if(userData.status == 400 || userData.status == 500) {
            response
                .status(userData.status)
                .json({message: userData.message});
            return;
        }
        response
            .status(200)
            .json(userData);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

module.exports = router;