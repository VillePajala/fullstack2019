import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdotesList = (props) => {
  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.addVote(anecdote)
            props.notificationChange(`You voted: "${anecdote.content}"`, 10)
            }
          }
        />
      )}
    </div>
  )
}

const anecdotesToShow = ( { anecdotes, filter }) => {
  if (filter === 'ALL') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
   visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  notificationChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdotesList)

