// ValidationError при невалидных данных]
// CastError при кривом Id
// DocumentNotFoundError если не найден по Id
const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
// const NotFoundError = require('./notFoundError');
const {
  badRequestMessage,
  conflictMessage,
} = require('../utils/errorMessages');

module.exports.customError = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return next(new BadRequestError(badRequestMessage));
  }
  /* if (err.name === 'DocumentNotFoundError') {
    return next(new NotFoundError('Запрашиваемые данные по указанному id не найдены'));
  } */
  if (err.code === 11000) {
    return next(new ConflictError(conflictMessage));
  }
  return next(err);
};
