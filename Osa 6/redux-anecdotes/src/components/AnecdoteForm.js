import React from 'react'
import addAnecdote from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        props.store.dispatch(
          addAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
      }

    return (
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
  }
  
  export default AnecdoteForm