import { useState, useEffect, useRef } from 'react'


// Components
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login events
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogUser", JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      console.log("Wrong credentials")
    }
  } 

  const logoutFunction = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  // -----------------------
  

  // Creating new blog and BlogForm
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
    })
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )
  // -----------------------


  // Rendering
  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <p>{user.name} logged in</p>

      <div>
        {blogForm()}
      </div>

      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}

      <button onClick={logoutFunction}>Logout</button>
    </div>
  )
}

export default App