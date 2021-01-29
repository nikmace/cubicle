const { Router } = require('express');
const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();

    res.render('home', {title: 'Browse', products });
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

router.post('/create', (req, res) => {
    //Validate inputs!
    
    productService.create(req.body);

    res.redirect('/products')
})

router.get('/details/:productId', (req, res) => {   
    let product = productService.getOne(req.params.productId);
    
    res.render('details', {title: 'Product Details', product});
});


module.exports = router;