"use strict";
const router = require("express").Router();
const {
  userViewController: UserView,
} = require("../../controllers/view/auth.view.controller");

router.all("/login", UserView.login);
router.all("/logout", UserView.logout);
router.all("/register", UserView.register);
router.all("/list", UserView.list);
module.exports = router;
