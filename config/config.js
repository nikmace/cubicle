const config = {
    development: {
        PORT: 5500,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://nikita:LISRx6r5@cubicles.gyjy6.mongodb.net/cubicle?retryWrites=true&w=majority',
    }
};

module.exports = config;