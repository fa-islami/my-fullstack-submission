const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (doc, rtnObj) => {
    rtnObj.id = rtnObj._id;
    delete rtnObj._id;
    delete rtnObj.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
