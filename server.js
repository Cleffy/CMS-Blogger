const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');

require('dotenv').config();

//Import sequelize connection
const sequelize = require('./config/connection');
//Create a Sequelize Store for an express session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Start express
const app = express();
const PORT = process.env.PORT || 3001;

const engine = exphbs.create({});

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 30*24*60*60*1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Create a handlebars engine and apply it to express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configure express with routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//Initialize express
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port: ' + PORT));
});