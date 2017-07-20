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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5970c439e4c9171c84bd8090')
  // }).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => console.log('Unable to fetch todos', err))

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`)
  // }, (err) => console.log('Unable to fetch todos', err))

  db.collection('Users').find({
    name: 'Yukari'
  }).toArray().then((docs) => {
    console.log('people:')
    console.log(JSON.stringify(docs, undefined, 2))
  })

//  db.close()
})