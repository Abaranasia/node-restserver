const { Router } = require('express');
const { check } = require('express-validator');

const {
  fieldValidator,
  jwtValidator,
  roleValidator,
  hasRole
} = require('../middlewares');


const { isValidRole, existingMail, existsuserById } = require('../helpers/db-validators');

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
  check('email', 'the email is not valid').custom(existingMail),
  check('password', 'password must be longer than 6 characters').isLength({ min: 6 }),
  // check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole), // call to func by reference gets as arg the return of the parent ( same as (res) => isValidRole(res))
  fieldValidator // Express automatically provides req, res and next params
], usersPost); // Invokes the controller

router.put('/:id', [
  check('id', 'Not a valid ID').isMongoId(),
  check('id').custom(existsuserById), // user id must exists in order to be updated
  check('role').custom(isValidRole),
  fieldValidator // this function validate all the data and rejects requests if they are not valid
], usersPut);

router.delete('/:id', [
  jwtValidator,
  // roleValidator,
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'Not a valid ID').isMongoId(),
  check('id').custom(existsuserById), // user id must exists in order to be updated
  fieldValidator // this function validate all the data and rejects requests if they are not valid
],
  usersDelete);
router.patch('/', usersPatch);

module.exports = router;