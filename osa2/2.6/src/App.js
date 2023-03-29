import { useState } from 'react'

const People = (props) => {
  return (
    <div>
      {props.data.filter((item) => {
        return props.search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(props.search)
      }).map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>

  )
}

const Filter = (props) => {
  return (
    <div>
      <form>
        filter: <input value={props.search} onChange={props.handleFilterChange}/>
      </form>
    </div>
  )
}

const Personform = (props) => {
  return (
    <form onSubmit={props.handleNewName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input type="number" value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: "+31-231-12314"}]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  const handleNewName = (event) => {
    event.preventDefault()

    let same = false
    persons.forEach((person) => {
      if (person.name === newName || person.number === newNumber) {
        same = true
      }
       
    })
    if (same) {
      window.alert(`This name or number is already added to phonebook`)
    } else {
      const newObject = {
      name: newName,
      number: newNumber
      }
      setPersons(persons.concat(newObject))
      setNewName("")
      setNewNumber("")
      same = false
    }

  }

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} search={search}/>
      <h2>add new name</h2>
      <Personform 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        handleNewName={handleNewName}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <People data={persons} search={search}/>
    </div>
  )

}

export default App