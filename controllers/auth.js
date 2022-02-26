
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const generateJWT = require('../helpers/generateJWT');
const User = require('../models/user');


const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  const returnError = () => {
    return res.status(400).json({
      msg: "Incorrect user or password"
    })
  }

  try {
    const user = await User.findOne({ email }); // It expects to find one match for this email

    // Verify if email exists
    if (!user) {
      returnError()
    };

    // Verify if user is active
    if (!user.state) { // Check if the (valid) email belongs to an inactive/deleted user
      returnError();
    };

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password) // compares the req and the user passwords
    if (!validPassword) {
      returnError()
    };

    // Generate JWT
    const token = await generateJWT(user.id);


    res.json({
      msg: 'Login ok',
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong... :/"
    });
  };
};



module.exports = {
  login,
}