
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const usersGet = (req = request, res = response) => {
  const query = req.query; // Reading optional query URLparams with Express (already parsed)

  res.status(200).json({
    msg: 'get API',
    query
  });
}

const usersPost = async (req = request, res = response) => {
  //const body = req.body;
  // It's a best practice to destructure the incoming data, as we can filter and limit the input
  // Mongoose will filter the body input based on the model and reject incomming date not matching the model
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Verify email

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save(); // This will actually save the data in the DB

  res.status(200).json({
    msg: 'post API',
    user
  });
}

const usersPut = (req = request, res = response) => {
  const id = req.params.id; // Reading URLparams with Express

  res.status(200).json({
    msg: 'put API',
    id
  });
}

const usersDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: 'delete API'
  });
}

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