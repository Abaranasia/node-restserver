
const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
  const query = req.query; // Reading optional query URLparams with Express (already parsed)

  res.status(200).json({
    msg: 'get API',
    query
  });
}

const usersPost = (req = request, res = response) => {
  //const body = req.body;
  // It's a best practice to destructure the incoming data, as we can filter and limit the input
  const { name, age } = req.body;

  res.status(200).json({
    msg: 'post API',
    name,
    age
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