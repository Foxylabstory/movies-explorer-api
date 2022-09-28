const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const { DEV_SECRET_KEY } = require('../utils/devconfig');
const AuthorizationError = require('../errors/authorizationError');
const {
  authorizationMessage,
} = require('../utils/errorMessages');
// защищает роуты авторизацией, если  нет токена, то кидает ошибку

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(authorizationMessage);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : DEV_SECRET_KEY);
  } catch (err) {
    throw new AuthorizationError(authorizationMessage);
  }
  req.user = payload;
  return next();
};
