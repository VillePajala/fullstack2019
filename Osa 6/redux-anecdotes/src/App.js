import React from 'react';
import { addAnecdote, addVote} from './reducers/anecdoteReducer'


const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const createAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      addAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }
  
  const vote = (id) => {
    store.dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App