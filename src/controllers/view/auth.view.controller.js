"use strict";
const {
  UnauthenticatedError,
  BadRequestError,
} = require("../../errors/customErrors");
const passwordValidator = require("../../helpers/passwordValidator");
const { mapUserToSession } = require("../../helpers/userHelper");
const User = require("../../models/User.model");

module.exports.authViewController = {
  login: async (req, res) => {
    if (req.method == "POST") {
      try {
        const { email, password } = req.body;
        if (!(email && password))
          throw new UnauthenticatedError(
            "Please enter a username/email and password",
          );

        const user = await User.findOne({ ...req.body });
        if (!user)
          throw new UnauthenticatedError("Wrong username/email or password");
        if (!user?.isActive)
          throw new UnauthenticatedError("This account is not active");

        req.session.user = mapUserToSession(user);

        req.session.token = user.generateAuthToken("withRefresh");

        if (req.body?.rememberMe) {
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        }
        res.redirect("/");
      } catch (error) {
        res.render("auth/loginForm", {
          user: req.session.user,
          errorMessage: error.message,
          userInput: req.body || null,
        });
      }
    } else {
      res.render("auth/loginForm", {
        user: req.session?.user,
      });
    }
  },

  register: async (req, res) => {
    if (req.method == "POST") {
      try {
        const { email, password, username } = req.body;
        if (!((email || username) && password))
          throw new UnauthenticatedError(
            "Please enter an username/email and password",
          );
        req.body.isAdmin = false;
        if (!passwordValidator(req.body?.password))
          throw new BadRequestError(
            "1 numeric 1 alphanumeric 1 special char and at least 8 char are necessary",
          );
        const data = await User.create(req.body);

        req.session.user = mapUserToSession(data);

        res.redirect("/");
      } catch (error) {
        res.render("auth/registerForm", {
          user: req.session?.user,
          errorMessage: error.message,
          userInput: req.body || null, // if user fill the form and error occured
        });
      }
    } else {
      res.render("auth/registerForm", {
        user: req.session.user,
      });
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.redirect("/");
  },
};
