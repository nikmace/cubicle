exports.validateRegisterInput = function(req, res, next) {
    let isValid = true;
    if (req.body.email.trim().length == 0) {
        isValid = false;
    } else if (req.body.password.trim().length == 0) {
        isValid = false;
    } else if (req.body.repassword.trim().length == 0){
        isValid = false;
    }

    if (req.body.password !== req.body.repassword) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}