"use strict";
const router = require("express").Router();
const {
  authViewController: AuthView,
} = require("../../controllers/view/auth.view.controller");

router.all("/login", AuthView.login);
router.all("/logout", AuthView.logout);
router.all("/register", AuthView.register);
module.exports = router;
