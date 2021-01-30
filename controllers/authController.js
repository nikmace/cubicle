const { Router } = require('express');
const authService = require('../services/authService');
const { validateRegisterInput } = require('../controllers/helpers/authHelper');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/register', validateRegisterInput, (req, res) => {
    authService.register(req.body)
        .then(() => res.redirect('/login'))
        .catch(() => res.status(500).end());
});




module.exports = router;