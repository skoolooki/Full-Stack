const Blog = require('../models/blog')

const initialNotes = [
  {
    title: "a book",
    author: "dostyoyevsky",
    url: "joku.com",
    likes: 2
  },
  {
    title: "second book",
    author: "nikolai",
    url: "se.com",
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}