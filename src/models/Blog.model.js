"use strict";

const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogCategories",
    timestamps: true,
  },
);

const blogPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    blogCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "BlogCategory",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
    imageUrl: String,
    likedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    visitedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
  },
  { collection: "blogPosts", timestamps: true },
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
};
