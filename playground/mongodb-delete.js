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

  // deleteMany
  db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    console.log(result)
  })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch!'}).then((result) =>{
  //   console.log(result)
  // })

  // // findOneAndDelete
  // db.collection('Users').findOneAndDelete({_id: ObjectID('5970c5774f09242bf48e1552')}).then((result) => {
  //   console.log(result)
  // })

  // also works without the promise
  db.collection('Users').deleteMany({name: 'Simi'})

//  db.close()
})