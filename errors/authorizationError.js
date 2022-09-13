const { UNAUTHORIZED } = require('../utils/statuses');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
