const env = process.env.NODE_ENV || 'development';
const express = require('express');

const config = require('./config/config')[env];
const app = require('express')();
const handlebars = require('express-handlebars');

require('./config/express')(app);
require('./config/routes')(app);


app.engine('hbs', handlebars({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(config.port, console.log(`Server is running on port ${config.port}!`));