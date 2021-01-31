require('dotenv/config');

const config = {
    development: {
        PORT: 5500,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: process.env.DB_CONNECTION_URI,
    }
};

module.exports = config;