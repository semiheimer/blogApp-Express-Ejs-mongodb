"use strict";
const {
  UnauthenticatedError,
  BadRequestError,
} = require("../../errors/customErrors");

const User = require("../../models/User.model");

module.exports.userViewController = {
  list: async (req, res) => {
    const data = await req.getModelList(User);
    const details = await req.getModelListDetails(User);

    const paginations = {
      beforePrevious: details.pages.beforePrevious,
      previous: details.pages.previous,
      current: details.pages.current,
      next: details.pages.next,
      afterNext: details.pages.afterNext,
    };
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
};
