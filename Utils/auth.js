//Checks to see if user is logged in before accessing dashboard
const withAuth = (request, response, next) => {
    if(!request.session.logged_in) {
        response.redirect('/login');
    }
    else {
        next();
    }
}

module.exports = withAuth;