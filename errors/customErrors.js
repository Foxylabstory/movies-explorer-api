const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const {
  badRequestMessage,
  conflictMessage,
} = require('../utils/errorMessages');

module.exports.customError = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return next(new BadRequestError(badRequestMessage));
  }
  if (err.code === 11000) {
    return next(new ConflictError(conflictMessage));
  }
  return next(err);
};
