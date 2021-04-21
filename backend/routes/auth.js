const router = require('express').Router();
const auth = require('../controllers/auth');
const passport = require('passport');


router.post('/signup',auth.signup);
router.post('/login', auth.login);
router.post('/get-user',passport.authenticate('jwt', {session: false}), auth.getUser);
router.post('/check-token',passport.authenticate('jwt', {session: false}), auth.checkToken);

router.post('/logout', auth.logout);


module.exports = {
  router: router,
  basePath: '/api/auth'
};
