import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App