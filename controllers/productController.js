const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('../controllers/helpers/productHelpers');
const {verifyToken } = require('../controllers/helpers/verifyToken');
const verifyLoggedUser = require('../controllers/helpers/verifyLoggedUser');

const router = Router();

router.get('/', (req, res) => {   
    let userVerif = verifyLoggedUser.verify(req, res);
    let products = productService.getAll(req.query)
        .then(products => {
            res.render('home', {title: 'Browse', products, userVerif });
        })
        .catch(() => res.status(500).end());

});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', async (req, res) => {   
    let product = await productService.getOneWithAccessories(req.params.productId);
    
    res.render('details', {title: 'Product Details', product});
});


router.get('/:productId/attach', async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);

    res.render('attachAccessory', {product, accessories});
});

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`));
})


module.exports = router;