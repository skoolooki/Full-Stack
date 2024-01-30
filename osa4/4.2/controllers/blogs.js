const blogsRouter = require("express").Router()
const { response } = require("express")
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//Get
blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

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

// Getting a token
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}
//Post

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body
    
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      likes: 0,
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

blogsRouter.put("/:id", (request, response, next) => {
    const body = request.body

    const blog = {
        content: body.content,
        important: body.important,
        likes: body.likes,
        user: body.user.id
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    }).catch(error => next(error))
})

module.exports = blogsRouter