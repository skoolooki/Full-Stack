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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

