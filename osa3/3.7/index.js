const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan("combined"))
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-234345"
    },
    {
        id: 3,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    
]
// Persons in json
app.get('/api/persons', (req, res) => {
    morgan(':method :url :status :res[content-length] - :response-time ms')
    res.json(persons)
})

// Yksittäinen person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
    morgan(':method :url :status :res[content-length] - :response-time ms')
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
        morgan(':method :url :status :res[content-length] - :response-time ms :postData')
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})
  

// Personin poisto
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    morgan(':method :url :status :res[content-length] - :response-time ms')
    response.status(204).end()
})



// Info
app.get('/info', (req, res) => {
    let personsAmount = persons.length 
    res.send(`
        <p>Phonebook has info for ${personsAmount} people<p>
        <p>a<p>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})