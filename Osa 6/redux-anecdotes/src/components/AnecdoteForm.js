import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
        props.notificationChange(`You added: "${content}"`, 10)
      }

    return (
      <div>
        <Filter />
        <h3>create new</h3>
        <form onSubmit={createAnecdote}>
          <div>
            <input name="anecdote"/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
        
    )
  }
  
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addAnecdote,
  notificationChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteForm)