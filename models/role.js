const { Schema, model } = require('mongoose');

const roleSchema = Schema({
  rol: {
    type: String,
    required: [true, 'A Role is required']
  }
});

module.exports = model('Role', roleSchema);