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

  // db.collection('Todos').insertOne({
  //   text: 'Some text',
  //   completed: false
  //
  // },(err, result) => {
  //   if (err) console.log('Unable to insert todo', err)
  //
  //   // result.ops is gonna store all the docs we inserted.
  //   // in this case .ops = .insertOne
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  // db.collection('Users').insertOne({
  //   name: 'Simi',
  //   age: 26,
  //   location: 'Stadi'
  //
  // }, (err, result) => {
  //   if (err) console.log('Unable to insert User', err)
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  //
  //   console.log(result.ops[0]._id.getTimestamp())
  // })

  db.close()
})