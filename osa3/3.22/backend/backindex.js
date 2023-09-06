require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const phonePersons = require('./modules/mongoose.js')

app.use(cors())
app.use(express.json())

// Persons in json
app.get('/api/persons', (request, response) => {
    phonePersons.find({}).then(person => {
        response.json(person)
    })
})

// Uusi person
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const person = new phonePersons ({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// 1 Person
app.get('/api/persons/:id', (request, response) => {
  phonePersons.findById(request.params.id).then(person => {
    response.json(person)
  })
})


// Delete Person
app.delete("/api/persons/:id", (request, response) => {
  phonePersons.findByIdAndRemove(request.params.id).then(()=> {
    response.status(204).end()
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

