const app = require('../app');
const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const api = require('supertest')(app);
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('blogs has unique identifier named "id"', async () => {
  const response = await api.get('/api/blogs');

  assert(response.body[0].id);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'BLOG4',
    author: 'Bogex',
    url: 'http://example.com/blog4',
    likes: 16,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogAtEnd.map(b => b.title);
  assert(titles.includes('BLOG4'));
});

test('the default value of likes property is 0', async () => {
  const newBlog = {
    title: 'BLOG5',
    author: 'Sompot',
    url: 'http://example.com/blog5',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogAtEnd = await helper.blogsInDb();
  const index = blogAtEnd.findIndex(b => b.title === 'BLOG5');

  assert.strictEqual(blogAtEnd[index].likes, 0);
});

test('blog with invalid data is not added', async () => {
  const invalidBlog = {
    author: 'Sarif',
    url: 'http://example.com/blog6',
    likes: 9,
  };

  await api.post('/api/blogs').send(invalidBlog).expect(400);
});

after(async () => await mongoose.connection.close());
