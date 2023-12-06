"use strict";
const { paginate } = require("../../helpers/paginate");
const { BlogCategory, BlogPost } = require("../../models/Blog.model");
// const data = await Pizza.updateOne({ _id: req.params.id }, { $push: { toppings: toppings } })
module.exports.blogPostViewController = {
  list: async (req, res) => {
    const data = await req.getModelList(BlogPost, "blogCategoryId", {
      isPublished: true,
    });
    const categories = await BlogCategory.find();
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: "desc" })
      .limit(4);

    const details = await req.getModelListDetails(BlogPost);

    const paginations = paginate(details);
    if (!req.originalUrl.includes("?")) req.originalUrl += "?";

    const regex = /\b(filter|sort|search)\b/i;

    if (!regex.test(req.originalUrl)) {
      req.originalUrl = req.originalUrl.split("&").join("");
    } else {
      req.originalUrl += "&";
    }
    req.originalUrl = req.originalUrl.split("page")[0];
    res.render("blogPost/postList", {
      user: req.session?.user,
      paginations,
      details,
      posts: data,
      categories,
      recentPosts,
      pageUrl: req.originalUrl,
      selectedCategory: req?.selectedCategoryId,
    });
  },

  create: async (req, res) => {
    if (req.method == "POST") {
      const data = await BlogPost.create(req.body);

      res.redirect("/post/" + data.id);
    } else {
      res.render("blogPost/postForm", {
        categories: await BlogCategory.find(),
        post: null,
        path: "create",
        user: req.session?.user,
        operation: "create",
      });
    }
  },

  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId",
    );

    const data1 = await BlogPost.updateOne(
      { _id: req.params.postId },
      { $push: { visitedUsers: req.session?.user.id } },
    );
    res.render("blogPost/postRead", {
      post: data,
      user: req.session?.user,
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
      res.render("blogPost/postForm", {
        user: req.session?.user,
        operation: "update", //blog Id area not shown (create-update)
        categories: await BlogCategory.find(),
        post: await BlogPost.findOne({ _id: req.params.postId }).populate(
          "blogCategoryId",
        ),
      });
    }
  },

  delete: async (req, res) => {
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      { isPublished: false },
    );
    res.redirect("/posts");
  },
};
