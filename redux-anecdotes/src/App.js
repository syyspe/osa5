import React from 'react';


class App extends React.Component {

  handleVote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({type: 'VOTE', id: event.target.id})
  }

  handleNew = (event) => {
    event.preventDefault()
    this.props.store.dispatch({type: 'NEW', content: event.target.content.value})
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes} votes
              <button id={anecdote.id} onClick={this.handleVote}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleNew}>
          <div><input name='content' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default App