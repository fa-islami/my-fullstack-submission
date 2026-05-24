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

after(async () => await mongoose.connection.close());
