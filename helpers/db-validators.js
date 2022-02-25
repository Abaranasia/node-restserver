const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => { // custom middleware
  const roleExists = await Role.findOne({ role }); // check if role exists in the DB
  if (!roleExists) {
    throw new Error(`The ${role} role doesn't exists in the DB`) // returns a custom error if role doesn't exists
  }
};

const existingMail = async (email = '') => { // Verify if email already exists; other validations are made via middleware
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email account ${email} already exists`)
  };
};

const existsuserById = async (id = '') => { // Verify if id already exists; other validations are made via middleware
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`The id ${email} doesn't exists`)
  };
};

module.exports = {
  isValidRole,
  existingMail,
  existsuserById
}

