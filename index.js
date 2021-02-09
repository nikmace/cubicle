const express = require('express');
const env = process.env.NODE_ENV.trim() || 'development';

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


app.listen(config.PORT, console.log(`Server is running on port ${config.PORT}..`));