"use strict";
const { mongoose } = require("mongoose");
module.exports = (err, req, res, next) => {
  const isValidationOrCastError =
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError;
  if (isValidationOrCastError) err.statusCode = 400;

  const statusCode = err.statusCode || 500;

  const data = {
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
  };

  if (req.url.startsWith("/api")) {
    return res.status(statusCode).send(data);
  } else {
    return res.render("error", { data });
  }
};
