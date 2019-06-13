import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import personService from './services/persons'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={color}>
      {message}
    </div>
  )
}


const Filter = ({filterName, changeHandler}) => {
  return (
    <div>
      filter shown with 
      <input value={filterName} onChange={changeHandler}/>
    </div>
  )
}

const PersonForm = ({submitHandler, newName, newNumber, nameChangeHandler, numberChangeHandler}) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: 
          <input value={newName} onChange={nameChangeHandler}/>
        </div>
          number: 
          <input value={newNumber} onChange={numberChangeHandler}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({names}) => {
  return (
    <div>
      {names}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ color, setColor ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personCheck = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(newName)
      }
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setColor('message')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setColor('error')
        let errorMessage = error.response.data.substr(121, 200)
        errorMessage = errorMessage.split("<br>")[0]
        console.log(errorMessage)
        setMessage(errorMessage)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (newName) => {
    const personToUpdate = persons.filter(person => person.name.toLowerCase() === newName)
    const changedPerson = { ...personToUpdate[0], number: newNumber}
    const id = (changedPerson.id)

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setColor('message')
        setMessage(`Updated ${changedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setColor('error')
        setMessage(`Information of ${changedPerson.name} has already been removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
  }

  const deletePerson = (id) => {
    const targetPerson = persons.filter(person => person.id === id)
    if (window.confirm(`Delete ${targetPerson[0].name}?`)) {
      personService
      .del(id)
      .then(deletedPerson => {
        setColor('message')
        setMessage(`Deleted ${targetPerson[0].name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setColor('error')
        setMessage(`Information of ${targetPerson[0].name} has already been moved from server`)
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }  
  }

  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumbersChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

    
  const names = () => persons.map((person) => {
    if (person.name.toLowerCase().includes(filterName.toLowerCase())) {
      return <div key={person.name}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>Delete</button></div>
    } else {
      return ''
    }
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color} />
      <Filter 
        filterName={filterName} changeHandler={handleFilterChange} 
      />
      <h2>Add a new</h2>
      <PersonForm 
        submitHandler={personCheck} 
        newName={newName} 
        nameChangeHandler={handlePersonsChange}
        newNumber={newNumber}
        numberChangeHandler={handleNumbersChange}
      />
      <h2>Numbers</h2>
      <Persons 
        names={names()}
      />
    </div>
  )
}

export default App
