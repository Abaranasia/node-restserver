
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const generateJWT = require('../helpers/generateJWT');
const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    // We must create the new user
    if (!user) {
      const data = {
        name,
        email,
        password: ':p',
        img: picture,
        google: true,
        state: true,
        role: "USER_ROLE"
      };

      user = new User(data);
      await user.save();
    };

    // User is in the DB but deactivate (state==false)
    if (!user.state) {
      return res.status(401).json({
        msg: 'User is blocked. Please contact the administrator'
      });
    };

    const token = await generateJWT(user.id);

    res.json({
      msg: 'All OK, access granted',
      user,
      token
    });

  } catch (error) {
    console.log("Error while verifying your Google Account: ", error)
  }


}

module.exports = {
  login,
  googleSignIn
}