const validator = require('validator');

const { emailValidationMesssage, urlValidationMesssage } = require('./errorMessages');

const isEmailValidation = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message(emailValidationMesssage);
};

const isURLValidation = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(urlValidationMesssage);
};

module.exports = {
  isEmailValidation,
  isURLValidation,
};
