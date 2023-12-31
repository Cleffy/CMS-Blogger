const router = require('express').Router();

//Home route
router.get('/', async (request, response) => {
    try {
        response.render('homepage', 
        {
            title: 'California Moonshine Society Blog',
            style: 'blog_home.css',
            logged_in: request.session.logged_in,
            user_id: request.session.user_id
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//Route to login
router.get('/login', (request, response) => {
    try {
        if(request.session.logged_in) {
            response.redirect('/');
            return;
        }
        response.render('login', 
        {
            title: 'CMS - Login',
            style: 'blog_form.css'
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//Route to register a new user
router.get('/register', (request, response) => {
    try {
        if(request.session.logged_in) {
            response.redirect('/');
            return;
        }
        response.render('register', 
        {
            title: 'CMS - Register',
            style: 'blog_form.css'
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//Route to manage a user's posts
router.get('/dashboard', (request, response) => {
    try {
        if(!request.session.logged_in) {
            response.redirect('/login');
            return;
        }
        response.render('dashboard', 
        {
            title: 'CMS - Dashboard',
            style: 'blog_home.css',
            logged_in: request.session.logged_in,
            user_id: request.session.user_id,
            user_name: request.session.user_name
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//Route to create a new post
router.get('/createPost', (request, response) => {
    try {
        if(!request.session.logged_in) {
            response.redirect('/login');
            return;
        }
        response.render('createPost', 
        {
            title: 'CMS - New Post',
            style: 'blog_form.css',
            logged_in: request.session.logged_in,
            user_id: request.session.user_id
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
});

module.exports = router