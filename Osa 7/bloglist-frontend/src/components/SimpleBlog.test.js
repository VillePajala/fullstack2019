import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title : 'Awesome blogtitle',
    author : 'Ville Pajala',
    likes : 33
  }

  const component = render (
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title : 'Awesome blogtitle',
    author : 'Ville Pajala',
    likes : 33
  }

  const mockHandler = jest.fn()

  const { getByText } = render (
    <SimpleBlog
      blog={blog}
      onClick={mockHandler}
    />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})