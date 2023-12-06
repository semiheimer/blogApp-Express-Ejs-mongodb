"use strict";

const router = require("express").Router();
const {
  blogPostViewController: BlogPostView,
} = require("../../controllers/view/blog.view.controller");
const viewAuthentication = require("../../middlewares/viewAuthentication");

router.all("/", BlogPostView.list);
router.use(viewAuthentication);
router.all("/create", BlogPostView.create);
router.all("/:postId/update", BlogPostView.update);
router.all("/:postId/delete", BlogPostView.delete);
router.all("/:postId", BlogPostView.read);

module.exports = router;
