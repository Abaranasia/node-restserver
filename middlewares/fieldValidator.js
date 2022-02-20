const { validationResult } = require("express-validator");

const fieldValidator = (req, res, next) => {

  const errors = validationResult(req); //first evaluate validation of incoming data
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  };

  next(); // this func follows the execution to the next middleware once this finishes
}

module.exports = {
  fieldValidator
}