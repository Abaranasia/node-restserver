
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


/********** GET **********/
const usersGet = async (req = request, res = response) => {
  // state field will represent innactive users as we won't delete them
  const { limit = 5, from = 0 } = req.query; // Reading optional query URLparams with Express (already parsed)

  const condition = { state: true }; // we use this condition to indicate that we only want to search and count the active users

  /*   const users = await User.find(condition) // Lists all users with state=true
      .skip(Number(from)) // MongoDB expects a number, not a string, so we have to cast it
      .limit(Number(limit))
    const total = await User.countDocuments(condition); */

  // We want to execute the next two async requests simultaneously...
  const [total, users] = await Promise.all([ // destructured array 
    User.countDocuments(condition),
    User.find(condition) // Lists all users with state=true
      .skip(Number(from)) // MongoDB expects a number, not a string, so we have to cast it
      .limit(Number(limit))
  ]);

  res.status(200).json({
    total,
    users
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

  res.status(200).json({ user });
}


/********** DELETE **********/
const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // const user = await User.findByIdAndDelete(id); // Physical delete of a document (not recomended!)
  const user = await User.findByIdAndUpdate(id, { state: false }) // We just update the state to false

  res.status(200).json({
    msg: `The item id=${id} has been removed`
  });
}


/********** PATCH **********/
const usersPatch = (req = request, res = response) => {
  res.status(200).json({
    msg: "patch"
  });
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
}