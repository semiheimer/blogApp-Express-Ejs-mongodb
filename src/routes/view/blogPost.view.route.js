"use strict";

const router = require("express").Router();
const {
  BlogPost: blogPostView,
} = require("../../controllers/view/blog.view.controller");

// router.all("/", (req, res) => {
//   res.redirect("/post");
// });

router.all("/", (req, res) => {
  res.redirect("/posts");
});
router.all("/posts/", blogPostView.list);
router.all("/posts/create", blogPostView.create);
router.all("/posts/:postId", blogPostView.read);
router.all("/posts/:postId/update", blogPostView.update);
router.all("/posts/:postId/delete", blogPostView.delete);

module.exports = router;
