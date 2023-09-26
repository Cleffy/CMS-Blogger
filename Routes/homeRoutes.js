const router = require('express').Router();

//Home route
router.get('/', (request, response) => {
    try {
        response.render('homepage');
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
        response.render('login');
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
        response.render('register');
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
        response.render('dashboard');
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//Route to create a new post
router.get('/post', (request, response) => {
    try {
        if(!request.session.logged_in) {
            response.redirect('/login');
            return;
        }
        response.render('post');
    }
    catch(error) {
        response.status(500).json(error);
    }
});

module.exports = router