const router = require('express').Router();
const collection = require('../controllers/collection')

router.post('/add-collection',collection.createCollection);
router.get('/get-collection',collection.getUserCollection);

module.exports = {
  router: router,
  basePath: '/api/collection'
};
