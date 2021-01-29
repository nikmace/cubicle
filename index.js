const env = process.env.NODE_ENV || 'development';
const express = require('express');

const config = require('./config/config')[env];
const app = express();

require('./config/express')(app);
require('./config/routes')(app);




app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(config.port, console.log(`Server is running on port ${config.port}!`));