const { INTERNAL_SERVER_ERROR } = require('../utils/statuses');
const { internalServerErrorMessage } = require('../utils/errorMessages');

module.exports.centralizedHandleError = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === INTERNAL_SERVER_ERROR ? internalServerErrorMessage : message });
  next();
};
