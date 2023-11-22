"use strict";
const { BlogCategory, BlogPost } = require("../../models/blogModel");

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogPost, "blogCategoryId");
    const categories = await BlogCategory.find();
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: "desc" })
      .limit(3);

    if (!req.url.includes("?")) req.url += "?";
    const details = await res.getModelListDetails(BlogPost);
    console.log(details);

    res.render("postList", {
      details,
      posts: data,
      categories,
      recentPosts,
      pageUrl: req.url.replace(/[?|&]page=([^&]+)/gi, ""), // clean 'page' queries from url.
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

      res.redirect("/post/" + req.params.postId);
    } else {
      res.render("postForm", {
        categories: await BlogCategory.find(),
        post: await BlogPost.findOne({ _id: req.params.postId }).populate(
          "blogCategoryId",
        ),
      });
    }
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    res.redirect("/");
  },
};
