const router = require('express').Router();
const auth = require('../controllers/auth')

router.post('/signup',auth.signup);
router.post('/login', auth.login);
router.post('/logout', auth.logout);


module.exports = {
  router: router,
  basePath: '/api/auth'
};
