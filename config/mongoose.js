const env = process.env.NODE_ENV.trim() || 'development';

const mongoose = require('mongoose');
const config = require('./config')[env];


module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        console.log('Db Connected..');
    });
}