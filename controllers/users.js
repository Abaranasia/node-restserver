
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

/********** GET **********/
const usersGet = (req = request, res = response) => {
  const query = req.query; // Reading optional query URLparams with Express (already parsed)

  res.status(200).json({
    msg: 'get API',
    query
  });
}


/********** POST **********/
const usersPost = async (req = request, res = response) => {

  //const body = req.body;
  // It's a best practice to destructure the incoming data, as we can filter and limit the input
  // Mongoose will filter the body input based on the model and reject incomming date not matching the model
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save(); // This will actually save the data in the DB

  res.status(200).json({
    msg: 'post API',
    user
  });
}

/********** PUT **********/
const usersPut = async (req = request, res = response) => { // Update data in the DB
  const { id } = req.params; // Reading URLparams with Express
  const { _id, password, google, email, ...rest } = req.body; // We do this to exclude fields to be updated

  // Validations
  if (password) { // password encrypt
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  };

  const user = await User.findByIdAndUpdate(id, rest)

  res.status(200).json({
    msg: 'put API',
    id
  });
}

/********** DELETE **********/
const usersDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: 'delete API'
  });
}

/********** PATCH **********/
const usersPatch = (req = request, res = response) => {
  res.status(200).json({
    msg: 'patch API'
  });
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
}