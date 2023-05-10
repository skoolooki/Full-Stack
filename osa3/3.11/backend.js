const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())

 let persons = [
    {
      name: "asewerewrewr",
      number: "234234324",
      id: "f2e0b3a0-e265-11ed-a770-2fc8472086ce"
    },
    {
      name: "sdfdsfsfdf",
      number: "342434",
      id: "09053070-e266-11ed-a770-2fc8472086ce"
    },
    {
      name: "amongus",
      number: "123",
      id: "36a93b50-e268-11ed-b4f1-27e630d5c653"
    },
    {
      name: "henri",
      number: "543254325",
      id: "484549d0-e268-11ed-b4f1-27e630d5c653"
    },
    {
      name: "asdasdwqeqw",
      number: "3213213",
      id: "595ebad0-e268-11ed-b4f1-27e630d5c653"
    }
]

// Persons in json
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Get one person

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Uusi person

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  let same = false

  if (!body.name || !body.number) {
      return response.status(400).json({ 
          error: 'content missing' 
      })
  }

  const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId(),
  }
  persons.forEach((person) => {
      if (person.name === newPerson.name || person.number === newPerson.number) {
          same = true
      }     
  })
  if (same) {
      return response.status(400).json({
          error: "name or number must be unique"
      })
  } else {
      same = false
      persons = persons.concat(newPerson)
      response.json(newPerson)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})