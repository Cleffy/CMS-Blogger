//Import path
const path = require('path');

//Import express, session, handlebars
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');

//Import routes, config data
const routes = require('./Routes');
require('dotenv').config();

//Get sequelize connection
const sequelize = require('./Config/connection');
//Create a Sequelize Store for an express session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Start express
const expApp = express();
const PORT = process.env.PORT || 3001;

//Create an express session with a SequelizeStore and apply it to express
const sessionObject = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
expApp.use(session(sessionObject));

//Create a handlebars engine and apply it to express
expApp.engine('handlebars', handlebars.engine);
expApp.set('view engine', 'handlebars');

//Configure express with routes
expApp.use(express.json());
expApp.use(express.urlencoded({ extended: true }));
expApp.use(express.static(path.join(__dirname, 'public')));
expApp.use(routes);

//Initialize express
sequelize.sync({ force: false }).then(() => {
    expApp.listen(PORT, () => console.log('Now listening'));
});