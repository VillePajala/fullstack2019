import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'


const FindCountries = ({filterWord, changeHandler}) => {
  return (
    <div>
      Find countries
      <input value={filterWord} onChange={changeHandler}/>
    </div>
  )
}

const Countries = ({showCountries}) => {
  return (
    <div>
      {showCountries}
    </div>
  )
}

function App() {
  const [ countriesList, setCountries ] = useState([])
  const [ weather, setWeather ] = useState('')
  const [ filterWord, setFilterWord ] = useState('')

  const countryData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const weatherData = (city) => {
    if (!city) {
      city = 'Paris'
    }
    let url = 'https://api.apixu.com/v1/current.json?key=9fe0f96a0e6b4ea194f103102193105&q='
    
    axios
      .get(url + city)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(countryData, [])
  useEffect(weatherData, [])

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }

  const countries = () => countriesList.filter(country => 
    country.name.toLowerCase().includes(filterWord.toLowerCase()))

  const languages = (languages) => languages.map( language => <li key={language.name}>{language.name}</li>)

  const showCountries = () => {
    if (countries().length === 250) {
      return ''
    }

    if (countries().length > 10) {
      return 'Too many matches, specify another filter'
    } 
    
    if (countries().length <= 10 && countries().length > 1) {
      return countries().map(country => 
        <div key={country.name}>
          {country.name} 
          <button 
            onClick={() => setFilterWord(country.name)}>
              show
          </button>
        </div>)
    }
    if (countries().length === 1) {
      weatherData(countries()[0].capital)
      console.log(countries()[0].capital)
      return showDetails(countries())
    }
  }

  const showDetails = (country) => {
    return country.map(country => 
      <div key={country.name}>
        <h1>{country.name}</h1>
        capital {country.capital} <br />
        population: {country.population}
        <h2>languages</h2>
          <ul>
            {languages(country.languages)}
          </ul> 
          <img src={country.flag} alt="flag" height="100"></img>
          <h2>Weather in {country.capital}</h2>
          <b>temperature: </b>{weather.current.temp_c}°C <br />
          <img src={weather.current.condition.icon} alt="weather" height="100"></img> <br />
          <b>wind: </b>{weather.current.wind_kph } kph direction {weather.current.wind_dir}<br />
      </div>)
  }
  
  
  return (
    <div>
      <FindCountries
        filterWord={filterWord}
        changeHandler={handleFilterChange}
      />
      <Countries 
        showCountries={showCountries()} 
      />
    </div>
  );
}

export default App;
