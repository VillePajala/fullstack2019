import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).not.toHaveTextContent(
      'The WebSite 3'
    )
    expect(component.container).not.toHaveTextContent(
      'Ville Jalandeeros'
    )
    expect(component.container).toHaveTextContent(
      'login'
    )
  })

  test('Bs are rendered when user is logged in', async () => {
    const user = {
      username: 'vpajala',
      name: 'Ville Pajala',
      token: 'jokuTokenvaan'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // Testi ei minulla mene läpi, vaikka mielestäni se pitäisi olla ihan oikein.
    expect(component.container).toHaveTextContent(
      'The WebSite 3'
    )

  })
})