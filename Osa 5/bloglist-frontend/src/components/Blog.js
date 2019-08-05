import React from 'react'

const Blog = ({ blog, username, deleteOnClick, onClickOpen, onClickClose, updateLikes, blogId }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (blog.id !== blogId) {
    return (
      <div className='blog' style={blogStyle} key={blog.id} onClick={onClickOpen}>
        {blog.title} {blog.author}
      </div>
    )
  } else if (blog.user.username === username) {
    return (
      <div className='blogOpen' style={blogStyle} key={blog.id} onClick={onClickClose}>
        {blog.title} {blog.author}<br />
        <a href="{blog.url}">{blog.url}</a><br />
        {blog.likes} likes <button onClick={updateLikes}>like</button><br />
        added by {blog.user.username}<br />
        <button onClick={deleteOnClick}>remove</button>
      </div>
    )
  } else {
    return (
      <div className='blogOpen' style={blogStyle} key={blog.id} onClick={onClickClose}>
        {blog.title} {blog.author}<br />
        <a href="{blog.url}">{blog.url}</a><br />
        {blog.likes} likes <button onClick={updateLikes}>like</button><br />
        added by {blog.user.username}<br />
      </div>
    )
  }
}

export default Blog