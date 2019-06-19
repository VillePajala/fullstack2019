const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .map(blog => blog.likes)
    .reduce((sum, value) => sum + value, 0)
}

const favoriteBlog = (blogs) => {
  let index = 0
  let mostLikes = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes) {
      mostLikes = blogs[i].likes
      index = i
    }
  }
  return {
    title: blogs[index].title,
    author: blogs[index].author,
    likes: blogs[index].likes
  }
}

const mostBlogs = (blogs) => {
  const authorsList = blogs
    .map(blog => blog.author)
    .reduce(
      (acc, author) => ({
        ...acc,
        [author]: (acc[author] || 0) + 1
      }),
      []
    )

  let maxKey = Object.keys(authorsList).reduce((prev, next) => {
    return authorsList[prev] > authorsList[next] ? prev : next
  })

  return {
    author: maxKey,
    blogs: authorsList[maxKey]
  }
}

const mostLikes = (blogs) => {
  let maxLikes = 0
  let likeSums = new Map()
  let mostLiked = 0

  for (let i = 0; i < blogs.length; i++) {
    let likeCount = blogs[i].likes
    if (likeSums.has(blogs[i].author)) {
      likeCount += likeSums.get(blogs[i].author)
    }

    likeSums.set(blogs[i].author, likeCount)
    if (likeCount >= maxLikes) {
      maxLikes = likeCount
      mostLiked = i
    }
  }

  return {
    author: blogs[mostLiked].author,
    blogs: maxLikes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}