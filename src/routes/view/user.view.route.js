"use strict";
const router = require("express").Router();
const {
  userViewController: UserView,
} = require("../../controllers/view/user.view.controller");

router.all("/", UserView.list);
router.all("/:userId/update", UserView.update);
module.exports = router;
