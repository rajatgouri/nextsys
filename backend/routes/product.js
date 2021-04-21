const router = require('express').Router();
const products = require('../controllers/products')

router.get('/get-products',products.getProducts);

module.exports = {
  router: router,
  basePath: '/api/product'
};
