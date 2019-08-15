import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  },[]) // eslint-disable-line

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdotesList />
    </div>
  )
}

export default connect(
  null, { initializeAnecdotes }
  )(App)