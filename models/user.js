const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorizationError');
const { emailPasswordAuthorizationMessage, emailValidationMesssage } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'Must be at least 2, you got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
    /* default: 'You are Rock', */
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email is not unique'],
    validate: {
      validator: (v) => isEmail(v),
      message: emailValidationMesssage,
    },
    // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(emailPasswordAuthorizationMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError(emailPasswordAuthorizationMessage);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
