const router = require('express').Router();
const products = require('../controllers/products')
const checkAuth = require('../middleware/auth');

router.get('/get-products', products.getAllProducts);
router.post('/add-product',checkAuth.authenticateJWT,  products.addProduct);
router.delete('/remove-product',checkAuth.authenticateJWT,  products.removeProduct)

module.exports = {
  router: router,
  basePath: '/api/product'
};
