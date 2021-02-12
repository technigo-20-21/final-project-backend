import mongoose from "mongoose";
// import crypto from "crypto";
// import bcrypt from "bcrypt-nodejs";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Use a minimum of 2 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Use a minimum of 2 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "The password must be at least six characters long."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true,
  },
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Local",
  },
});

const User = mongoose.model("User", userSchema);

module.exports;
