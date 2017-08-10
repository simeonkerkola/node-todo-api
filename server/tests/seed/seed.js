const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
  _id: userOneId,
  email: 'user1@example.com',
  password: 'password1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'user2@example.com',
  password: 'password2'
}]

const todos = [{
  _id: new ObjectID(),
  text: 'First text todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 666
}]

const populateTodos = (done) => {
  Todo.remove({}) // wipes out all todos
  .then(() => Todo.insertMany(todos)) // insert our arrays
  .then(() => done())
}

const populateUsers = (done) => {
  // passing an empty object removes all users
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save()
    const userTwo = new User(users[1]).save()

    // Promise.all taks an array of promises and then callback is not gonna get
    // fired until all of those promises resolved, meaning that userOne & userTwo
    // were succesfully saved to the database
    return Promise.all([userOne, userTwo])
  }).then(() => done())
}

module.exports = {todos, populateTodos, users, populateUsers}