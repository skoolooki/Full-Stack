const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialNotes)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs to have id', async () => {
    const response = await api.get('/api/blogs')

    expect(response).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "that one",
        author: "dostyoyevsky",
        url: "joku.com",
        likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.notesInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      newBlog.title
    )
})


afterAll(async () => {
  await mongoose.connection.close()
})