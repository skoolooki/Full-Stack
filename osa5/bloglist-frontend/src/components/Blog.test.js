import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    likes: 0,
    important: true,
    user: {
      name: "Him"
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    likes: 0,
    important: true,
    user: {
      name: "Him"
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog}/>
  )

  const user = userEvent.setup()
  const button = screen.getAllByText('View')
  await user.click(button[0])

  expect(mockHandler.mock.calls).toHaveLength(1)
})

// test('<BlogForm /> updates parent state and calls onSubmit', async () => {
//   const user = userEvent.setup()
//   const createNote = jest.fn()

//   render(<BlogForm/>)

//   const input = screen.getByRole('textbox')
//   const sendButton = screen.getByText('save')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
// })
