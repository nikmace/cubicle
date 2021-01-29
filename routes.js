const { Router } = require('express');
const router = Router();
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');

router.use('/', homeController);
router.use('/products', productController);


//not found
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;

