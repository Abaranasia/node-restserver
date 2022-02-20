const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/fieldValidator');
const { usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch } = require('../controllers/users');

const router = Router();
/*  We can define here the router callback, but it's
    more clear if it's extrated to controllers folder */
// router.get('/', (req, res) => {res.json({msg: 'get API'});});

router.get('/', usersGet);

router.post('/', [ //midleware validations
  check('name', 'the name field is required').not().isEmpty(),
  check('email', 'the email is not valid').isEmail(),
  check('password', 'password must be longer than 6 characters').isLength({ min: 6 }),
  check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  fieldValidator // Express automatically provides req, res and next params
], usersPost);

router.put('/:id', usersPut);
router.delete('/', usersDelete);
router.patch('/', usersPatch);

module.exports = router;