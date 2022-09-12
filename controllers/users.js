const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY, HASH_LENGTH = 10 } = process.env;
// const { HASH_LENGTH, SECRET_KEY } = require('../environment/env');
const User = require('../models/user');
const { customError } = require('../errors/customErrors');
const { CREATED } = require('../errors/errorStatuses');
// const AuthorizationError = require('../errors/authorizationError');
const NotFoundError = require('../errors/notFoundError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, HASH_LENGTH).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(CREATED).header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'dev-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          // httpOnly: true, // выключили доступ к куке из ЖС
          sameSite: 'None', // принимает/отправляет куки только с того же домена
          secure: 'True',
          // crossOrigin: true,
        }).header({
          'Cross-Origin-Resource-Policy': 'cross-origin',
          'Acces-Control-Allow-Credentials': 'true',
        }).send({ message: 'allowed' });
    })
    .catch((err) => next(err));
};

const findUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(users);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  ).orFail(() => {
    throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
  })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

module.exports = {
  createUser,
  login,
  findUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
