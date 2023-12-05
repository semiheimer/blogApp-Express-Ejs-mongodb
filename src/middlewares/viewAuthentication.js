"use strict";

const { UnauthenticatedError } = require("../errors/customErrors");
const { verifyAccessJWT } = require("../helpers/tokenHelpers");
const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  const { refresh, access } = req?.session.token || {};

  if (!access) res.redirect("/auth/login");
  try {
    const decoded = verifyAccessJWT(access);
    const user = await User.findOne({ _id: decoded._id }, { isActive: 1 });

    if (!user) res.redirect("/auth/register");
    if (!user?.isActive) res.redirect("/auth/register");
    next();
  } catch (error) {
    req.session = null;
    res.redirect("/");
  }
};
