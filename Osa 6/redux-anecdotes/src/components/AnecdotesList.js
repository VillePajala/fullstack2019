import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdotesList = ({ store }) => {
  return (
    <div>
      {store.getState().map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            store.dispatch(addVote(anecdote.id))
          }
        />
      )}
    </div>
    
  )
}
  
  export default AnecdotesList