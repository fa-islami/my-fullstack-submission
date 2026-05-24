const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'BLOG1',
    author: 'John Doe',
    url: 'http://example.com/blog1',
    likes: 8,
  },
  {
    title: 'BLOG2',
    author: 'Steve',
    url: 'http://example.com/blog2',
    likes: 6,
  },
  {
    title: 'BLOG3',
    author: 'Alex',
    url: 'http://example.com/blog3',
    likes: 18,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
