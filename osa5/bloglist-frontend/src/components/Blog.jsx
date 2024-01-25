import { useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogInfoStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeFunction = () => {

  }
  
  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.content} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <div style={blogInfoStyle}>
          {blog.content} <button onClick={toggleVisibility}>Close</button>
          <p>Author: {blog.user.name}</p>
          <p>Likes: {blog.likes} <button onClick={likeFunction}>like</button></p> 
        </div>
      </div>  
    </div>
  )
}

export default Blog