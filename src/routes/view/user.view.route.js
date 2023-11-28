"use strict";
const router = require("express").Router();
const {
  userViewController: UserView,
} = require("../../controllers/view/user.view.controller");

router.all("/list", UserView.list);
module.exports = router;
