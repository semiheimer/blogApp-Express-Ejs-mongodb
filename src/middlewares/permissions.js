"use strict";
const { UnauthorizedError } = require("../errors/customErrors");
module.exports = {
  // isLogin: (req, res, next) => {

  //     if (process.env.NODE_ENV == 'development') return next()

  //     if (req.user) {
  //         next()
  //     } else {
  //         res.errorStatusCode = 403
  //         throw new Error('NoPermission: You must login.')
  //     }
  // },

  //   isStaffOrAdmin: (req, res, next) => {
  //     if (process.env.NODE_ENV == "development") return next();

  //     if (req.user && (req.user.isStaff || req.user.isAdmin)) {
  //       next();
  //     } else {
  //       res.errorStatusCode = 403;
  //       throw new Error("NoPermission: You must login and to be Staff.");
  //     }
  //   },

  isAdmin: (req, res, next) => {
    // if (process.env.NODE_ENV == "development") return next();

    if (!req?.session.user.isAdmin) return res.redirect("/");
    next();
  },

  isAdminOrOwnUser: (req, res, next) => {
    const isAuthorized =
      req?.session.user.isAdmin || req?.user?._id === req.params?.userId;
    if (!isAuthorized) return res.redirect("/");
  },
};
