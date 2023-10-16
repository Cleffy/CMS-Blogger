//Import path
const path = require('path');

//Import express, session, handlebars
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');

//Import routes, helpers, config
const routes = require('./Routes');
//const helpers = require('./Utils/helpers');
require('dotenv').config();

//Get sequelize connection
const sequelize = require('./Config/connection');
//Create a Sequelize Store for an express session
const sequelizeStore = require('connect-session-sequelize')(session.Store);

//Start express
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 30*24*60*60*1000,
        httpOnly: true,
        secure: false, 
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(function (request, response, next){
    response.locals.session = request.session;
    next();
});

//Create a handlebars engine and apply it to express
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configure express with routes
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(routes);

//Initialize express
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port: ' + PORT));
});