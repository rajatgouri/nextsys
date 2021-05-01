const router = require('express').Router();
const admin = require('../controllers/admin')
const checkAuth = require('../middleware/auth');

router.post('/add-product',checkAuth.authenticateJWT,  admin.addProduct);
router.put('/edit-product',checkAuth.authenticateJWT,  admin.editProduct);
router.post('/add-collection', checkAuth.authenticateJWT, admin.addCollection);
router.put('/edit-collection', checkAuth.authenticateJWT, admin.editCollection);
router.delete('/remove-product', checkAuth.authenticateJWT, admin.removeProduct);
router.get('/users', checkAuth.authenticateJWT, admin.getUsers)

module.exports = {
  router: router,
  basePath: '/api/admin'
};