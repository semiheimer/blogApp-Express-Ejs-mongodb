"use strict";
const router = require("express").Router();
const { BlogPost } = require("../../controllers/api/blog.api.controller");

router
  .route("/post/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);

router.get("/category/:categoryId/posts", BlogPost.listCategoryPosts);

module.exports = router;
