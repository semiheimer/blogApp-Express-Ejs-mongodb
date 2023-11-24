"use strict";
const router = require("express").Router();
const { UserView } = require("../../controllers/view/user.view.controller");

router.all("/login", UserView.login);
router.all("/logout", UserView.logout);

module.exports = router;
