"use strict";
const router = require("express").Router();
const {
  userViewController: UserView,
} = require("../../controllers/view/user.view.controller");

router.all("/login", UserView.login);
router.all("/logout", UserView.logout);
router.all("/register", UserView.register);
module.exports = router;
