import React, { useState, useEffect } from 'react'
import NewPerson from './components/NewPerson'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifications, setNotifications] = useState(null)


  useEffect(() => {
    PersonService.getContact()
    .then(res => {
      setPersons(res)
  })
  .catch(error =>
      console.log('error', error))
  }, [])

  const Notifications = ({message}) => {
    const messageStyle = {
      border: '3px solid green',
      background: 'lightgray',
      fontSize: 30,
      padding: '10px',
      marginBottom: '10px'
    }
    if(message === null){
      return null
    } 
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }

  const addName = (e) => {
    e.preventDefault()
    console.log('target', e.target)

    const exactMatch = persons.filter(person => person.name === newName)
  
    if(exactMatch.length > 0){
      if(window.confirm(`${newName} is already added to phonebook. Would you like to replace old phone number?`)){
        const oldContact = persons.find(person => person.name === newName)
        PersonService
        .update(oldContact.id, {...oldContact, number: newNumber})
        .then(updatedPerson => {
          setPersons(persons?.map(p => p.id === updatedPerson.id ? updatedPerson : p ))
          setNotifications('')
          setNewName('')
          setNewNumber('')
          setNotifications(`${updatedPerson.name}'s phone number has been change to ${updatedPerson.number}.`)
          setTimeout(() => {
            setNotifications(null)
          }, 5000)
        })
        .catch(err =>{
          console.log(err)
          setNotifications(`Information for ${oldContact.name} has already been deleted.`) 
          setTimeout(() => {
            setNotifications(null)
          }, 5000)
          // setPersons(persons.filter(p => p.id !== person.id))
        })
        }
    }
    else {
    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    PersonService
    .create(nameObj)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setNotifications(`${newPerson.name} has been added.`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    })
    .catch(err => {
      console.log(err.response.data)
    })
    }
  }


  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }
  
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
    console.log("value", e.target.value)
    const re = new RegExp(newFilter, 'i')
    const newFilterPerson = persons.filter(person => person.name.match(re))
    setPersons(newFilterPerson)

  }

  const handleDelete = ({person}) => {
    if(window.confirm(`Delete ${person.name}?`)){
      PersonService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      setNotifications(`Deleted ${person.name}.`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    })
      .catch(err =>{
        console.log(err)
      })
    }
    else
      return

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={notifications}/>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

        <h2>Add a New Contact</h2>
        
        <NewPerson 
          addName={addName} 
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
          />

        <h2>Numbers</h2>
        <Persons 
        persons={persons}
        handleDelete={handleDelete}
        />
    </div>
  )
}

export default App
