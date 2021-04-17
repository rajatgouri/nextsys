const router = require('express').Router();
const products = require('../controllers/products')

router.get('/get-products',products.getProducts);

router.get('/get-product-by-collection', product.getProductByCollection)

module.exports = {
  router: router,
  basePath: '/api/product'
};
