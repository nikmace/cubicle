const { Router } = require('express');
const authService = require('../services/authService');
const { validateRegisterInput } = require('../controllers/helpers/validateRegister');
const { verifyToken } = require('../controllers/helpers/verifyToken');
const { sessionChecker } = require('../controllers/helpers/sessionHelper');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/register', validateRegisterInput, (req, res) => {
    authService.register(req, res)
        .then(() => res.redirect('/api/login'))
        .catch((err) => res.status(500).end());
});

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
});

router.post('/login', (req, res) => {
    authService.login(req, res)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());    
});

module.exports = router;