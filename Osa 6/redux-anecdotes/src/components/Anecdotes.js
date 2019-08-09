import React from 'react'
import addVote from '../reducers/anecdoteReducer'

const Anecdote = ( props ) => {
    

    return (
      <div>
        {props.anecdote.content}
        has {props.anecdote.votes}
        <button onClick={props.onClick}>vote</button>
      </div>
    )
  }

  const Anecdotes = ( store ) => {
    

    return (
      <div>
        {store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            onClick={() => store.dispatch(addVote(anecdote.id))}
          />
        )}
      </div>
    )
  }
  
  export default { Anecdotes }