const router = require('express').Router();
const products = require('../controllers/products')

router.get('/get-products',products.getProducts);

router.get('/get-product-by-collection', products.getProductsByCollection)

module.exports = {
  router: router,
  basePath: '/api/product'
};
