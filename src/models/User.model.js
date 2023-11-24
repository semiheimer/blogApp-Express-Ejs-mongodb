"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const { createRefreshJWT, createAccessJWT } = require("../helpers/tokenHelper");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email field is required."],
      unique: true,
      validate: [
        (email) => {
          const emailRegexCheck =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegexCheck.test(email);
        },
        "Email format is not correct.",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
      set: (password) => passwordEncrypt(password),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    firstName: { type: String, minLength: 3, required: true },
    lastName: { type: String, minLength: 2, required: true },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, {
  message: "This {PATH} is exist",
});

userSchema.methods.generateAuthToken = function (isRefresh = false) {
  const token = {};

  token.access = createAccessJWT({
    _id: this._id,
    email: this.email,
    isAdmin: this.isAdmin,
    firstname: this.firstname,
    lastname: this.lastname,
    isActive: this.isActive,
  });

  if (isRefresh)
    token.refresh = createRefreshJWT({
      _id: this._id,
      password: this.password,
    });
  return token;
};

module.exports = mongoose.model("User", userSchema);