const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field']
  },
  email: {
    type: String,
    required: [true, 'An unique email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

module.exports = model('User', userSchema);