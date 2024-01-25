import { useState} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    console.log(blog)
  }
  
  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.content} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        
      </div>  
    </div>
  )
}

export default Blog