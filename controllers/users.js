const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY, HASH_LENGTH = 10 } = process.env;
const { DEV_SECRET_KEY, DEV_HASH_LENGTH } = require('../utils/devconfig');
const User = require('../models/user');
const { customError } = require('../errors/customErrors');
const { DONE, CREATED } = require('../utils/statuses');
const {
  notFoundMessage,
} = require('../utils/errorMessages');
const NotFoundError = require('../errors/notFoundError');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, NODE_ENV === 'production' ? HASH_LENGTH : DEV_HASH_LENGTH).then((hash) => User.create({
    name, email, password: hash,
  }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : DEV_SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(notFoundMessage);
    })
    .then((user) => {
      res.status(DONE).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => {
      throw new NotFoundError(notFoundMessage);
    })
    .then((user) => {
      res.status(DONE).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
