"use strict";

const router = require("express").Router();
const { BlogPostView } = require("../../controllers/view/blog.view.controller");

router.all("/", BlogPostView.list);
router.all("/create", BlogPostView.create);
router.all("/:postId", BlogPostView.read);
router.all("/:postId/update", BlogPostView.update);
router.all("/:postId/delete", BlogPostView.delete);

module.exports = router;
