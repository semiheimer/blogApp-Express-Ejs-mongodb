"use strict";
const { BlogCategory, BlogPost } = require("../../models/blogModel");

module.exports.BlogPostView = {
  list: async (req, res) => {
    const data = await req.getModelList(BlogPost, "blogCategoryId");
    const categories = await BlogCategory.find();
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: "desc" })
      .limit(4);

    const details = await req.getModelListDetails(BlogPost);

    const paginations = {
      beforePrevious: details.pages.beforePrevious,
      previous: details.pages.previous,
      current: details.pages.current,
      next: details.pages.next,
      afterNext: details.pages.afterNext,
    };

    if (!req.originalUrl.includes("filter")) {
      req.originalUrl = req.originalUrl.split("&").join("");
    } else {
      req.originalUrl += "&";
    }
    req.originalUrl = req.originalUrl.split("page")[0];

    res.render("postList", {
      paginations,
      details,
      posts: data,
      categories,
      recentPosts,
      pageUrl: req.originalUrl,
    });
  },

  create: async (req, res) => {
    if (req.method == "POST") {
      const data = await BlogPost.create(req.body);

      res.redirect("/post/" + data.id);
    } else {
      res.render("postForm", {
        categories: await BlogCategory.find(),
        post: null,
        path: "create",
      });
    }
  },

  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId",
    );
    res.render("postRead", {
      post: data,
    });
  },

  update: async (req, res) => {
    if (req.method == "POST") {
      const data = await BlogPost.updateOne(
        { _id: req.params.postId },
        req.body,
        { runValidators: true },
      );

      res.redirect("/posts/" + req.params.postId);
    } else {
      res.render("postForm", {
        path: "update",
        categories: await BlogCategory.find(),
        post: await BlogPost.findOne({ _id: req.params.postId }).populate(
          "blogCategoryId",
        ),
      });
    }
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    res.redirect("/posts");
  },
};
