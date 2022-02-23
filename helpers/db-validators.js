const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => { // custom middleware
  const existsRole = await Role.findOne({ role }); // check if role exists in the DB
  if (!existsRole) {
    throw new Error(`The ${role} role doesn't exists in the DB`) // returns a custom error if role doesn't exists
  }
};

const existingMail = async (email = '') => { // Verify if email already exists; other validations are made via middleware
  const emaiExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email account ${email} already exists`)
  };
};

module.exports = {
  isValidRole,
  existingMail
}

