import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
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
  const [ blogId, setBlogId ] = useState('')

  const blogFormRef = React.createRef()

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
        setBlogs(initialBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
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

  const updateBlog = async (id) => {
    try {
      const blogToUpdate = await blogs.filter(blog => blog.id === id)

      const blogUpdate =
        {
          'user' : blogToUpdate[0].user.id,
          'likes' : blogToUpdate[0].likes + 1,
          'author' : blogToUpdate[0].author,
          'title' :  blogToUpdate[0].title,
          'url' : blogToUpdate[0].url
        }

      blogService
        .update(id, blogUpdate)
        .then(blogUpdate => {
          setColor('message')
          setMessage(`${blogUpdate.title} liked`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

      blogService
        .getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
        })
    } catch (exception) {
      setColor('error')
      setMessage('something went wrong, try again')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = (id) => {
    const blogToDelete = blogs.filter(blog => blog.id === id)
    if (window.confirm(`Delete ${blogToDelete[0].title}?`)) {
      try {
        blogService
          .remove(id)
          .then(deletedBlog => {  // eslint-disable-line no-unused-vars
            setColor('message')
            setMessage(`Deleted ${blogToDelete[0].title}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })

        blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
          })
      } catch (exception) {
        setColor('error')
        setMessage(`Blog ${blogToDelete[0].title} has already been moved from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    try {
      const users = await userService.getAll()
      const loggedinUser = await users.map(x => x.username === user.username)

      const blogPost =
        {
          'title' : title,
          'author' : author,
          'url' : url,
          'likes' : 0,
          'userId' : loggedinUser.id
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

      blogService
        .getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
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

  const blogTitles = () => blogs.map((blog) => {


    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (blog.id !== blogId) {
      return (
        <div style={blogStyle} key={blog.id} onClick={() => setBlogId(blog.id)}>
          {blog.title}
        </div>
      )
    } else if (blog.user.username === user.username) {
      return (
        <div style={blogStyle} key={blog.id} onClick={() => setBlogId('')}>
          {blog.title} {blog.author}<br />
          <a href="{blog.url}">{blog.url}</a><br />
          {blog.likes} likes <button onClick={() => updateBlog(blog.id)}>like</button><br />
          added by {blog.user.username}<br />
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} key={blog.id} onClick={() => setBlogId('')}>
          {blog.title} {blog.author}<br />
          <a href="{blog.url}">{blog.url}</a><br />
          {blog.likes} likes <button onClick={() => updateBlog(blog.id)}>like</button><br />
          added by {blog.user.username}<br />
        </div>
      )
    }
  })

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} color={color} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :
        <div>
          <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleSubmit={handleBlogPost}
            />
          </Togglable>
          <Blog
            blogTitles={blogTitles()}
          />
        </div>
      }
    </div>
  )
}

export default App
