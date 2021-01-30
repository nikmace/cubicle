const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
})

module.exports = mongoose.model('Accessory', accessorySchema);