const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// var id = '5975c8234d24e7134423e6fb11'
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }

// Todo.find({ // returns an array of documents
//   _id: id
// }).then((todos) => {
//   console.log('Todos:', todos)
// })
//
// Todo.findOne({ // returns a single document
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo)
// })

// Todo.findById(id).then((todo) => { // more simple to just find by id
//   if (!todo) return console.log('Id not found') // if id doesnt exist
//   console.log('Todo by id:', todo)
// }).catch((e) => console.log(e))


// Finding a User
var id = '5972f02d41af4510f030576c'

if (!ObjectID.isValid(id)) console.log('ID not valid')

User.findById(id).then((user) => {
  if (!user) return console.log('User not found!')
  console.log('User:', user)
}, (e) => console.log(e))