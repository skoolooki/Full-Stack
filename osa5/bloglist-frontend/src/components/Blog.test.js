import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    likes: 0,
    important: true,
    user: {
      name: "Him"
    }
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})