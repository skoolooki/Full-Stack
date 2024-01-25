import { useState } from "react";

const Blogform = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')

    const addBlog = (event) => {
      event.preventDefault()
      createBlog({
        content: newBlog,
        likes: 0,
        important: true
      })
  
      setNewBlog('')
    }
  
    return (
      <div>
        <h2>Create a new Blog</h2>
  
        <form onSubmit={addBlog}>
          <input
            value={newBlog}
            onChange={event => setNewBlog(event.target.value)}
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
}

export default Blogform