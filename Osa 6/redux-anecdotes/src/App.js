import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdotesList />
    </div>
  )
}

export default App