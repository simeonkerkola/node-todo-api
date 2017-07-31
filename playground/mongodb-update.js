// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

var user = {name: 'simi', age: 25}
var {name} = user // takes name value from user object, pretty cool :)
console.log(name)

//args: (your app url, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // by adding a return statement, the succes code isnt going to run if err
    return console.log('Unable to connect to Mongodb server')
  }
  console.log('Connected to MongoDB server')

  //findOneAndUpdate
  db.collection('Todos').findOneAndUpdate({
    _id: ObjectID('59723dffb9e4de1b3c16cf24') // filter
  }, {
    $set: { // mongodb update operators
      completed: false
    }
  }, {
    returnOriginal: false // options
  }).then((result) => {
    console.log(result)
  })

  // update User's name and increment the age by 1
  db.collection('Users').findOneAndUpdate({
    _id: ObjectID('5970cb6a3e7b3a2bb42073e5')
  }, {
    $set: {name: 'Simi'},
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })

//  db.close()
})