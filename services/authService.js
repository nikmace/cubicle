const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const { verifyToken } = require('../controllers/helpers/verifyToken');


async function register(req, res) {
    //Check if user is already in database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    let user = new User({
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        res.status(400).send(error);
    }
}

async function login(req, res) {
    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send('Email doesn\'t exist!');
    }
    
    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400).send('Invalid password!');
    }
    
    //JWT Token
    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_KEY);
    res.setHeader('Authorization', 'Bearer ' + token);
    return user;
}


module.exports = {
    register,
    login,
}
