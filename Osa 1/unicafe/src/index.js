import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


/* Sain ratkaisun toimimaan niin, että Statistics -komponentti printtaa vain yhden rivin 
  ja komponenttia kutsutaan sitten useamman kerran App -komponentista. En kuitenkaan 
  saanut tätä ratkaisua toimimaan ilman konsolin virheilmoituksia, vaikka lisäsin 
  <tbody></tbody> tagit. Ratkaisu, jonka olisin halunnut tehdä, on tässä nyt kommentoitu pois.
  Teknisesti pitäisi täyttää tehtävänannon, sillä tällä ratkaisulla pidän huolta, ettei virheilmoituksia näy*/
const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Hyvä</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>Neutraali</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>Huono</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>Yhteensä</td>
          <td>{props.good + props.neutral + props.bad}</td>
        </tr>
        <tr>
          <td>Keskiarvo</td>
          <td>{(props.good - props.bad) / (props.good + props.neutral + props.bad)}</td>
        </tr>
        <tr>
          <td>Positiivisia</td>
          <td>{(props.good / (props.good + props.neutral + props.bad) * 100) + ' %'}</td>
        </tr>
      </tbody>
    </table>

    /* Alkuperäinen ratkaisu. Toimii, mutta antaa konsoliin virheilmoituksen
    <>
      <tr>
        <td>{props.text}/td>
        <td>{props.value}/td>
      </tr>
    </>
    */
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>anna palautetta</h1>
        <Button handleClick={() => setGood(good + 1)} text="Hyvä"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutraali" />
        <Button handleClick={() => setBad(bad + 1)} text="Huono" />
        <h1>statistiikka</h1>
        <p>Ei vielä yhtään statistiikkaa </p>
      </div>
    )
  }


  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} text="Hyvä"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutraali" />
      <Button handleClick={() => setBad(bad + 1)} text="Huono" />
    
      <h1>statistiikka</h1>
     
      <Statistics good={good} neutral={neutral} bad={bad}  />

      {/* Alkuperäinen ratkaisu. Toimii, mutta konsoli antaa virheilmoituksen
      <table>
        <tbody>
          <Statistics text="Hyvä" value={good} />
          <Statistics text="Neutraali" value={neutral} />
          <Statistics text="Huono" value={bad} />
          <Statistics text="Yhteensä" value={good + neutral + bad} />
          <Statistics text="Keskiarvo" value={(good - bad) / (good + neutral + bad)} />
          <Statistics text="Positiivisia" value={(good / (good + neutral + bad) * 100) + ' %'} />
        </tbody>
      </table>
       */}
          
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)