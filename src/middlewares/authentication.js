"use strict";

const { UnauthenticatedError } = require("../errors/customErrors");
const { verifyAccessJWT } = require("../helpers/tokenHelper");
const UserModel = require("../models/User.model");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const accessToken = auth ? auth.split(" ")[1] : null;
  if (!accessToken) throw new UnauthenticatedError("Authentication invalid");
  try {
    const decoded = verifyAccessJWT(accessToken);
    const user = await UserModel.findOne({ _id: decoded._id }, { isActive: 1 });
    if (!user) throw new UnauthenticatedError("This account doesn't exist");
    if (!user?.isActive)
      throw new UnauthenticatedError("This account is not active");
    req.user = decoded;
    res.locals.user = req.session?.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
