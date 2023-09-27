//Import path
const path = require('path');

//Import express, session, handlebars
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');

//Import routes, helpers, config
const routes = require('./Routes');
//const helpers = require('./Utils/helpers');
require('dotenv').config();

//Get sequelize connection
const sequelize = require('./Config/connection');
//Create a Sequelize Store for an express session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Start express
const app = express();
const PORT = process.env.PORT || 3001;

//Create a handlebars engine and apply it to express
app.engine('handlebars', handlebars.engine(
    { 
        defaultLayout: 'main' 
    }));
app.set('view engine', 'handlebars');

app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
    }
));

//Configure express with routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(routes);

//Initialize express
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port: ' + PORT));
});