"use strict";
const router = require("express").Router();
const { BlogPost } = require("../../controllers/api/blog.api.controller");
const apiAuthentication = require("../../middlewares/apiAuthentication");

router.route("/").get(BlogPost.list);
//authentication middleware
router.use(apiAuthentication);

router.route("/").post(BlogPost.create);
router
  .route("/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);
router.put("/:postId/like", BlogPost.likePost);

router.get("/category/:categoryId/posts", BlogPost.listCategoryPosts);

module.exports = router;
