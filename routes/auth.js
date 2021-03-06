const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/fieldValidator');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();
/*  We can define here the router callback, but it's
    more clear if it's extrated to controllers folder */

router.post('/login', [
  check('email', "A email is required").isEmail(),
  check('password', "Password is required").not().isEmpty(),
  fieldValidator
], login);

router.post('/google', [
  check('id_token', "ID Token is required").not().isEmpty(),
  fieldValidator
], googleSignIn);

module.exports = router;