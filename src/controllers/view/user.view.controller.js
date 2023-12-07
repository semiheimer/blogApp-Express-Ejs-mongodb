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
      try {
        if (!passwordValidator(req.body?.password))
          throw new BadRequestError(
            "1 numeric 1 alphanumeric 1 special char and at least 8 char are necessary",
          );

        const data = await User.updateOne(
          { _id: req.params.userId },
          req.body,
          {
            runValidators: true,
          },
        );

        res.redirect("/users/" + req.params.userId + "/update");
      } catch (error) {
        res.render("auth/registerForm", {
          user: req.session?.user,
          errorMessage: error.message,
          userInput: req.body || null, // if user fill the form and error occured
        });
      }
    } else {
      res.render("user/editUserForm", {
        path: "update",
        user: await User.findOne({ _id: req.params.userId }),
        operation: "update",
      });
    }
  },
};
// if (req.method == "POST") {
//   try {
//     const { email, password } = req.body;
//     if (!((email || username) && password))
//       throw new UnauthenticatedError(
//         "Please enter an username/email and password",
//       );
//     req.body.isAdmin = false;
//     if (!passwordValidator(req.body?.password))
//       throw new BadRequestError(
//         "1 numeric 1 alphanumeric 1 special char and at least 8 char are necessary",
//       );
//     const data = await User.create(req.body);

//     req.session.user = mapUserToSession(data);

//     res.redirect("/");
//   } catch (error) {
//     res.render("auth/registerForm", {
//       user: req.session?.user,
//       errorMessage: error.message,
//       userInput: req.body || null, // if user fill the form and error occured
//     });
//   }
// } else {
//   res.render("auth/registerForm", {
//     user: req.session.user,
//   });
// }
