const { StatusCodes } = require("http-status-codes");
//404
const NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
};
//400
const BadRequestError = class BadRequestError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.cause = options.cause || null;
  }
};
//401
const UnauthenticatedError = class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
};
//403
const UnauthorizedError = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
};
module.exports = {
  UnauthorizedError,
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
};
