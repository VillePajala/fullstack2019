import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.store.dispatch(
          addAnecdote(content)
        )
      }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
        
    )
  }
  
  export default AnecdoteForm