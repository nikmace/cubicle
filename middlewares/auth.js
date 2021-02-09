const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function() {
    return (req, res, next) => {
        let token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
                if (err) {
                    res.clearCookie('token');
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    }
}