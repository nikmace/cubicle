const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        },
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

//cubeSchema.methods
//cubeSchema.virtual
//cubeSchema.path('imageUrl).get((v) => {if(v.startsWith('...'))})

module.exports = mongoose.model('Cube', cubeSchema);