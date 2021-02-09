const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('../controllers/helpers/productHelpers');
const verifyLoggedUser = require('../middlewares/verifyLoggedUser');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/', (req, res) => {   
    //let userVerif = verifyLoggedUser.verify(req, res);
    let products = productService.getAll(req.query)
        .then(products => {
            res.render('home', {title: 'Browse', products });
        })
        .catch(() => res.status(500).end());

});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body, req.user._id)
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
});


router.get("/:productId/edit", (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCubePage', {title: 'Edit', product});           
        })
});

router.post('/:productId/edit', validateProduct, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(err => {
            console.log(err);
        })
});

router.get("/:productId/delete", (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (req.user._id != product.creator) {
                res.redirect(`/products/details/${req.params.productId}`);
            } else {
                res.render('deleteCubePage', {title: 'Delete', product});           
            }
        });
});

router.post("/:productId/delete", (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(response => res.redirect('/products'));
});


module.exports = router;