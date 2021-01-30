const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(data) {
    //Check if user is already in database
    const emailExists = await User.findOne({ email: data.email });
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    //Hash passwords
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    //Create a new user
    let user = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(err);
    }
}

async function login(data) {

}


module.exports = {
    register,
    login,
}
