const router = require('express').Router();
const checkAuth = require('../middleware/auth');
const collection = require('../controllers/collection')

router.post('/add-collection', checkAuth.authenticateJWT, collection.addCollection);
router.get('/get-collection', checkAuth.authenticateJWT , collection.getUserCollection);
router.get('/get-admin-collection', checkAuth.authenticateJWT, collection.getAdminCollection);
router.delete('/remove-collection', checkAuth.authenticateJWT, collection.removeCollection);

module.exports = {
  router: router,
  basePath: '/api/collection'
};
