const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.verifyToken = function(req, res, next) {
    const token = req.headers['Authorization'];
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid token');
    }
    
}