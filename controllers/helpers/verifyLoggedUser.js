const jwt = require('jsonwebtoken');
require('dotenv/config');


function verify(req, res) {
    const token = req.cookies.token;
    if (!token) {
        //res.status(401).send('Access Denied');
        console.log('Access denied');
    }
    let verifiedUser = {};

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        verifiedUser = {
            verified,
            isLoggedIn: true,
        }
    } catch (err) {
        //res.status(400).send('Invalid token');
        console.log('Invalid token  ' + err.message);
        verifiedUser = {
            isLoggedIn: false,
        }
    }
    return verifiedUser;
}

module.exports = {
    verify,
}