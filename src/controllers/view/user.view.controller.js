"use strict";
const {
  UnauthenticatedError,
  BadRequestError,
} = require("../../errors/customErrors");
const { paginate } = require("../../helpers/paginate");

const User = require("../../models/User.model");

module.exports.userViewController = {
  list: async (req, res) => {
    const data = await User.find({});
    const details = await req.getModelListDetails(User);

    const paginations = paginate(details);

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
      paginations,
      details,
      users: data,
      pageUrl: req.originalUrl,
    });
  },
  update: async (req, res) => {
    if (req.method == "POST") {
      console.log(req.body);
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
