const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

//Get
blogsRouter.get("/", (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

//Get 1 blog by id
blogsRouter.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

//Post
blogsRouter.post("/", (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save().then(savedBlog => {
        response.json(savedBlog)
    }).catch(error => next(error))
})

//Delete
blogsRouter.delete("/:id", (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})


//Update

module.exports = blogsRouter