const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set('toJSON', {
  transform: (doc, rtnObj) => {
    rtnObj.id = rtnObj._id;
    delete rtnObj._id;
    delete rtnObj.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
