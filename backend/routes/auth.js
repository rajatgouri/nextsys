const router = require('express').Router();
const auth = require('../controllers/auth');

router.post('/signup',auth.signup);
router.post('/login', auth.login);
router.get('/checkUsername', auth.checkUsername);

module.exports = {
  router: router,
  basePath: '/api/auth'
};
