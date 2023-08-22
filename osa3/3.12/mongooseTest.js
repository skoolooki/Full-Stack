const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('number', personSchema) 

if (process.argv.length == 3) {
  const password = process.argv[2]

  const url = `mongodb+srv://slava:${password}@cluster0.r3u2bai.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(number => {
      console.log(number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const password = process.argv[2]

  const url = `mongodb+srv://slava:${password}@cluster0.r3u2bai.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)


  const phone = new Person({
    name: name,
    number: number
  })

  phone.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log("something went wrong")
}


