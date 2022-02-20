
const { response } = require('express');


const usersGet = (req, res = response) => {

  res.status(200).json({
    msg: 'get API'
  });
}

const usersPost =  (req, res) => {
  res.status(200).json({
    msg: 'post API'
  })
}

const usersPut = (req, res) => {
  res.status(200).json({
    msg: 'put API'
  })
}

const usersDelete = (req, res) => {
  res.status(200).json({
    msg: 'delete API'
  })
}

const usersPatch = (req, res) => {
  res.status(200).json({
    msg: 'patch API'
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
}