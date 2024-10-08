"use strict";

const { UnauthenticatedError } = require("../errors/customErrors");
const { verifyAccessJWT } = require("../helpers/jwt.helpers");
const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  const { refresh, access: accessToken } = req?.session.token || {};

  if (!accessToken) throw new UnauthenticatedError("Authentication invalid");
  try {
    const decoded = verifyAccessJWT(accessToken);
    const user = await User.findOne({ _id: decoded._id }, { isActive: 1 });
    if (!user) throw new UnauthenticatedError("This account doesn't exist");
    if (!user?.isActive)
      throw new UnauthenticatedError("This account is not active");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication invalid");
  }
};
