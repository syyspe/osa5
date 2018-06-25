import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'
import './index.css'


const GOOD = 'GOOD'
const OK = 'OK'
const BAD = 'BAD'
const ZERO = 'ZERO'

const Statistiikka = ({ handleNollaus }) => {
    const hyva = store.getState().good
    const ok = store.getState().ok
    const huono = store.getState().bad
    const palautteita =  hyva + ok + huono 
  
    if (palautteita === 0) {
      return (
        <div>
          <h2>Statistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }
  
    return (
      <div>
        <h2>Statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{hyva}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{huono}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{(hyva - huono)/palautteita}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{hyva * 100/palautteita}%</td>
            </tr>
          </tbody>
        </table>
  
        <button onClick={handleNollaus}>nollaa tilasto</button>
      </div >
    )
  }

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>Anna palautetta</h2>
                <button onClick={this.klik(GOOD)}>hyvä</button>
                <button onClick={this.klik(OK)}>neutraali</button>
                <button onClick={this.klik(BAD)}>huono</button>
                <Statistiikka handleNollaus={this.klik(ZERO)}/>
            </div>
        )
    }
}

const store = createStore(counterReducer)

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)


