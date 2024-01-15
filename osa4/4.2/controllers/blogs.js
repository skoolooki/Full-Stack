const blogsRouter = require("express").Router()
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog")
const User = require('../models/user')

// Getting a token
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

//Get
blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//Get 1 blog by id
blogsRouter.get("/:id", async (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

//Post
blogsRouter.post("/", async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.json(savedBlog)
})

//Delete
blogsRouter.delete("/:id", (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})


//Update

module.exports = blogsRouter