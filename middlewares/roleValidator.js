
const { response } = require('express');

const roleValidator = (req, res = response, next) => {

  if (!req.user) { // Just in case something went wrong with verifying the previous middleware
    return res.status(500).json({
      msg: 'Token must be valid before validate role'
    });
  }

  const { name, role } = req.user;

  if (role !== 'ADMIN_ROLE') { // Check if authUser is not admin
    return res.status(401).json({
      msg: `unauthorized operation: user ${name} is not Admin`
    });
  };

  next();
};

const hasRole = (...roles) => { // We need one or more arguments here, but middlewares don't work this way...
  return (req, res = response, next) => { // We need a callback to make it operative as middleware

    if (!req.user) { // Just in case something went wrong with verifying the previous middleware
      return res.status(500).json({
        msg: 'Token must be valid before validate role'
      });
    }

    if (!roles.includes(req.user.role)) { // Check if authUser is not admin
      return res.status(401).json({
        msg: `unauthorized operation: user ${req.user.name} must be one of these roles: ${roles}`
      });
    };

    next();
  }
}

module.exports = {
  roleValidator,
  hasRole
}