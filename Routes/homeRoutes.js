const router = require('express').Router();
//const { User, Post } = require('../models');
//const withAuth = require('../utils/auth');


router.get('/', async (request, response) => {
    try {
        response.render('homepage', {
            logged_in: true,
            page: 'The California Moonshine Society Blog'
        });
    }
    catch(error) {
        response.status(500).json(error);
    }
})

//get login page

//redirect to login if not logged in with Dashboard

module.exports = router