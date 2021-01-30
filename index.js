const env = process.env.NODE_ENV || 'development';
const express = require('express');

const config = require('./config/config')[env];
const routes = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

//Routing
app.use(routes);

app.listen(config.port, console.log(`Server is running on port ${config.port}!`));