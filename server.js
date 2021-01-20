import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import dotenv from "dotenv";

import company from "./company"

require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/torslandalocals";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
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
});

userSchema.pre("save", async function (next) {
  const user = this;

  // If the password is not changed
  if (!user.isModified("password")) {
    return next();
  }

  // Encrypt the password if it is changed
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", company);

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Clearing and populating database
if (process.env.RESET_DATABASE) {
  const populateDatabase = async () => {
    await Company.deleteMany();

    companies.forEach(company => {
      const newCompany = new Company(item);
      newCompany.save()
    });
  };
  populateDatabase();
}


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Endpoint for signing up user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ id: newUser._id, accessToken: newUser.accessToken });
  } catch (err) {
    res.status(400).json({ message: "Could not create user.", errors: err });
  }
});

// Endpoint for logging in user
app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ id: user._id, accessToken: user.accessToken, name: user.name });
  } else {
    res.status(400).json({
      message: "Could not log in, check your user details.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
