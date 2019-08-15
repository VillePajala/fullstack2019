import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const anecdoteToChange = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const changedAnecdote = await anecdoteService.update(anecdote.id, anecdoteToChange)
    dispatch({
      type: 'ADD_VOTE',
      data: changedAnecdote,
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      return  state
                .map(a => a.id !== id ? a : action.data)
                .sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    case 'NEW_ANECDOTE':
      const newItem = action.data
      return [...state, newItem] 
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default reducer
