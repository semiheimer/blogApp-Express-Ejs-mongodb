"use strict";
const { BadRequestError } = require("../../errors/customErrors");

const passwordValidator = require("../../helpers/passwordValidator");

const User = require("../../models/User.model");

module.exports.userViewController = {
  list: async (req, res) => {
    const data = await User.find({});

    if (!req.originalUrl.includes("?")) req.originalUrl += "?";

    const regex = /\b(filter|sort|search)\b/i;

    if (!regex.test(req.originalUrl)) {
      req.originalUrl = req.originalUrl.split("&").join("");
    } else {
      req.originalUrl += "&";
    }
    req.originalUrl = req.originalUrl.split("page")[0];

    res.render("user/userList", {
      user: req.session?.user,
      users: data,
    });
  },
  update: async (req, res) => {
    if (req.method == "POST") {
      if (!passwordValidator(req.body?.password))
        throw new BadRequestError(
          "1 numeric 1 alphanumeric 1 special char and at least 8 char are necessary",
        );

      const data = await User.updateOne({ _id: req.params.userId }, req.body, {
        runValidators: true,
      });

      res.redirect("/users/" + req.params.userId + "/update");
    } else {
      res.render("auth/registerForm", {
        path: "update",
        user: await User.findOne({ _id: req.params.userId }),
        operation: "update",
      });
    }
  },
};
