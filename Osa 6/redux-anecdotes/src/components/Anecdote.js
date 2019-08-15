import React from 'react'

const Anecdote = ({ anecdote, handleClick, showNotifications }) => {
  const style = {
    padding: 7,
    borderBottom: 'solid',
    borderWidth: 1,
    borderColor: 'silver'
  }
    return(
      <div style={style}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes <br />
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
  }

  export default Anecdote