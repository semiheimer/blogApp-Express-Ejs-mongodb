"use strict";

const { UnauthenticatedError } = require("../errors/customErrors");
const { verifyAccessJWT } = require("../helpers/jwt.helperss");
const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  const { refresh, access } = req?.session.token || {};

  if (!access) return res.redirect("/auth/login");
  try {
    const decoded = verifyAccessJWT(access);
    const user = await User.findOne({ _id: decoded._id }, { isActive: 1 });

    if (!user) return res.redirect("/auth/register");
    if (!user?.isActive) return res.redirect("/auth/register");
    next();
  } catch (error) {
    req.session = null;
    return res.redirect("/");
  }
};
