const express = require('express');
const env = process.env.NODE_ENV.trim() || 'development';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const config = require('./config/config')[env];
const routes = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

//Routing
app.use(routes);
app.use(express.json());

//Morgan: to log info about requests for developemnt use
app.use(morgan('dev'));
//BodyParser: to parse request
app.use(bodyParser.urlencoded({ extended:true }));
//CookieParser: to allow the cookies to be stored in the browser
app.use(cookieParser());

//Express-session: to track logged in user through sessions
app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}))

app.listen(config.PORT, console.log(`Server is running on port ${config.PORT}..`));