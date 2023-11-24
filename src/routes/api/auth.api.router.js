"use strict";
const router = require("express").Router();
const auth = require("../../controllers/api/auth.api.controller");

router.post("/login", auth.login);
router.get("/refresh", auth.refresh);
router.get("/logout", auth.logout);
router.post("/register", auth.register);
module.exports = router;
