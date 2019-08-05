import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('Only blog title and author are rendered by default', () => {
  const blog = {
    title : 'Awesome blogtitle',
    author : 'Ville Pajala',
    url : 'www.villepajala.com',
    likes : 33,
    user : {
      username : 'villepajala',
      name : 'Ville Pajala',
      id : '12345'
    }
  }

  const blogId = '123456'

  const component = render (
    <Blog
      blog={blog}
      blogId={blogId}
    />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).not.toHaveTextContent(
    `<a href="${blog.url}">${blog.url}</a><br />`
  )
})

test('If blog item is clicked, more info is displayed', async () => {
  const blog = {
    title : 'Awesome blogtitle',
    author : 'Ville Pajala',
    url : 'www.villepajala.com',
    likes : 33,
    user : {
      username : 'villepajala',
      name : 'Ville Pajala',
      id : '12345'
    },
    id : '123'
  }

  const blogId = '12345'
  const username = 'villepajala'

  const component = render (
    <Blog
      blog={blog}
      blogId={blogId}
      username={username}
    />
  )

  const div = component.container.querySelector('.blog')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  // Testi ei minulla mene läpi, vaikka mielestäni se pitäisi olla ihan oikein.
  expect(component.container).not.toHaveTextContent(
    'added'
  )
})