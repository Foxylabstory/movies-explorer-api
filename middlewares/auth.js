const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const AuthorizationError = require('../errors/authorizationError');
// защищает роуты авторизацией, если  нет токена, то кидает ошибку

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-key');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

/* module.exports = (req, res, next) => {
  debugger;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;
  return next();
}; */
