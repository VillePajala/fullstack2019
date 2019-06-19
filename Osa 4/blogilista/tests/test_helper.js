const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The Greatest portfolio of all time',
    author: 'Ville Pajala',
    url: 'https://www.villepajala.com',
    likes: 55
  },
  {
    title: 'The Second-Greatest portfolio of all time',
    author: 'Ville Johannes Pajala',
    url: 'https://www.villejohannespajala.com',
    likes: 33
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return notEqual._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports= {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}