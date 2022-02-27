const { response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = require('../models/user');

const jwtValidator = async (req, res = response, next) => {

  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      msg: 'unauthorized operation: no token provided'
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); // Check if token is valid

    // We add to the request the uid of the user that calls the delete, so we can get it from the delete controller
    // req.uid = uid // this would be ok as we would send to the route the uid to get the authuser
    const authUser = await User.findById(uid);

    // Verify if authUser exists and he has state= true
    if (!authUser || !authUser.state) {
      return res.status(401).json({
        msg: 'unauthorized operation: invalid token provided'
      });
    };

    req.user = authUser;

    next(); // passes execution flow to next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'unauthorized operation: invalid token provided'
    });
  }

};

module.exports = {
  jwtValidator
}

