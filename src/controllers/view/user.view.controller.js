"use strict";
const User = require("../../models/userModel");

module.exports.UserView = {
  login: async (req, res) => {
    if (req.method == "POST") {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
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
          res.errorStatusCode = 401;
          throw new Error("Login parameters are not true.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Email and Password are required.");
      }
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
