const { Schema, model } = require('mongoose');

const UserSchema = Schema({
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
    enum: ['ADMIN_ROLE', 'USER_ROLE']
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

UserSchema.methods.toJSON = function () { // Overloaded method to extract useless properties and return cleaner response
  const { __v, password, ...userProps } = this.toObject();
  return userProps
}

module.exports = model('User', UserSchema);