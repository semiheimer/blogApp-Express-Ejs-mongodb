"use strict";
const router = require("express").Router();
const { BlogPost } = require("../../controllers/api/blog.api.controller");

router.route("/").get(BlogPost.list).post(BlogPost.create);

router
  .route("/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);
router.put("/:postId/like", BlogPost.likePost);

router.get("/category/:categoryId/posts", BlogPost.listCategoryPosts);

module.exports = router;
