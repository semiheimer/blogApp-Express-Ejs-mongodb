"use strict";
const { UnauthenticatedError } = require("../../errors/customErrors");
const User = require("../../models/userModel");

module.exports.UserView = {
  login: async (req, res) => {
    if (req.method == "POST") {
      const { email, password } = req.body;
      if (!((email || username) && password))
        throw new UnauthenticatedError(
          "Please enter an username/email and password",
        );

      const user = await User.findOne({ email: email, password: password });
      if (!user)
        throw new UnauthenticatedError("Wrong username/email or password");
      if (!user?.isActive)
        throw new UnauthenticatedError("This account is not active");
      req.session = {
        user: {
          id: user.id,
          email: user.email,
          password: user.password,
        },
      };
      if (req.body?.rememberMe) {
        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
      }
      res.redirect("/");
    } else {
      res.render("loginForm", {
        user: req.session?.user,
      });
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.redirect("/");
  },
};
