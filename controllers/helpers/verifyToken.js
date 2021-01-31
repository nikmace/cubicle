const jwt = require('jsonwebtoken');

exports.verifyToken = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(authHeader);
    console.log(token);
    
    if (token == null) {
        return res.sendStatus(401).send('Token is null');
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403).send(err);
        }
        req.user = user;
        next();
    });
}