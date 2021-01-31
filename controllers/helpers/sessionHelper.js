exports.sessionChecker = function(req, res, next) {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/products');
    } else {
        next();
    }
}