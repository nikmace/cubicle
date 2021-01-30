const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 256,
    }
});

module.exports = mongoose.model('User', userSchema);