import React, { useState, useEffect } from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'


function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ color, setColor ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setColor('message')
      setMessage('Login succesful')
      setUser(user)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setColor('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    try {
      const users = await userService.getAll()
      const loggedinUser = await users.map(x => x.username === user.username)

      const blogPost =
        {
          "title" : title,
          "author" : author,
          "url" : url,
          "likes" : 0,
          "userId" : loggedinUser.id
        }
      
      blogService
        .create(blogPost)
        .then(returnedBlogs => {
          setBlogs(blogs.concat(returnedBlogs))
          setColor('message')
          setMessage(`a new blog ${title} by ${author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  
      blogService.setToken(user.token)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setColor('error')
      setMessage('something went wrong, try again')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
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
            name="password"
            onChange={({ target }) => setPassword(target.value)}
              />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const userBlogs = () => blogs.map((blog) => {
    if (blog.user.username === user.username) {
      return <div key={blog.id}>{blog.title} </div>
    } else {
      return ''
    }
  })

  const blogForm = () => (
    <div>
      <form onSubmit={handleBlogPost}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} color={color} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
        {blogForm()}
        <Blog blog={userBlogs()} />
      </div>
    }
    </div>
  );
}

export default App;
