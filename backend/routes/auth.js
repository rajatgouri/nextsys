const router = require('express').Router();
const auth = require('../controllers/auth');

router.post('/signup',auth.signup);
router.post('/login', auth.login);
router.get('/checkUsername', auth.checkUsername);
router.post('/upload/profile', auth.uploadProfile);
router.post('/upload/background', auth.uploadBackground);
router.get('/getImages', auth.getImages);

module.exports = {
  router: router,
  basePath: '/api/auth'
};
