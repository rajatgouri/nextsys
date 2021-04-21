const router = require('express').Router();
const passport = require('passport');
const collection = require('../controllers/collection')

router.post('/add-collection',passport.authenticate('jwt', {session: false}),collection.createCollection);
router.get('/get-collection',collection.getUserCollection);

module.exports = {
  router: router,
  basePath: '/api/collection'
};
