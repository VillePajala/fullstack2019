const blogs = [
  {
    title: 'The WebSite 3',
    author: 'Ville Johannes Pajalandeeros',
    url: 'https://www.villejohannespajalanderos.com',
    likes: 39,
    user: {
      username: 'mluukkai',
    },
    id: '5d08dcb54e1f9d2edbc1c8be'
  },
  {
    title: 'The WebSite 2',
    author: 'Ville Jalandeeros',
    url: 'https://www.viespajalanderos.com',
    likes: 36,
    user: {
      username: 'mluukkai',
    },
    id: '5d08dd624e1f9d2edbc1c8c0'
  },
  {
    title: 'The WebSite 6',
    author: 'Ville J46eeros',
    url: 'https://www.viespdfhdfhdfhajalanderos.com',
    likes: 33,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d08dc254e1f9d2edbc1c8bd'
    },
    id: '5d09d68013f84293006c44b6'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }