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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})