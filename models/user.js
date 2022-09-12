const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: false,
    minlength: [2, 'Must be at least 2, you got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    // required: false,
    minlength: [2, 'Must be at least 2, you got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    // required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => {
        validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
    },
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email is not unique'],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
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
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
