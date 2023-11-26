"use strict";
const { BlogCategory, BlogPost } = require("../../models/Blog.model");

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await req.getModelList(BlogCategory);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidators: true },
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await req.getModelList(BlogPost, "blogCategoryId");

    res.status(200).send({
      error: false,
      count: data.length,
      details: await res.getModelListDetails(BlogPost),
      result: data,
    });
  },

  listCategoryPosts: async (req, res) => {
    const data = await BlogPost.find({
      blogCategoryId: req.params.categoryId,
    }).populate("blogCategoryId");

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId",
    ); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body,
      { runValidators: true },
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },
  likePost: async (req, res) => {
    const data = await BlogPost.findOne({
      _id: req.params.postId,
      likedUsers: { $in: req.session?.user.id },
    });

    if (!data) {
      await BlogPost.updateOne(
        { _id: req.params.postId },
        { $push: { likedUsers: req.session?.user.id } },
      );
    } else {
      await BlogPost.updateOne(
        { _id: req.params.postId },
        { $pull: { likedUsers: req.session?.user.id } },
      );
    }
    const newData = await BlogPost.findOne(
      {
        _id: req.params.postId,
      },
      { likedUsers: 1, _id: 0 },
    );

    res.status(200).send({
      error: false,
      result: newData,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
