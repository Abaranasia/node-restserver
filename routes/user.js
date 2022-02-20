const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');

const router = Router();

// We can define here the router callback, 
// but it's more clear if it's extrated to controllers folder

/* router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'get API'
  });
}); */

router.get('/', usersGet);
router.post('/', usersPost);
router.put('/', usersPut);
router.delete('/', usersDelete);
router.patch('/', usersPatch);

module.exports = router;