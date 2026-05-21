const express = require("express");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const config = require("./utils/config");
const { info, error } = require("./utils/logger");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => info("Connected to MongoDB"))
  .catch((err) => error("Error connecting to MongoDB", err.message));

app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
