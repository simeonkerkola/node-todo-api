require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', authenticate, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id,
    })
    const doc = await todo.save()
    return res.send(doc)
  } catch (e) {
    return res.status(400).send() // https://httpstatuses.com/
  }
})

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({
      _creator: req.user._id,
    })
    res.send({ todos })
  } catch (e) {
    res.status(400).send(e)
  }
})

// GET /todos/12345
app.get('/todos/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id

    // Valid id using isValid
    // if not found res 404 - send back empty body
    if (!ObjectID.isValid(id)) return res.status(404).send({})
    const todo = await Todo.findOne({
      _id: id,
      _creator: req.user._id,
    })

    // if no todo - send back 404 with empty body
    if (!todo) return res.status(404).send({})
    return res.send({ todo })
  } catch (e) {
    return res.status(400).send(e)
  }
})

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    // get the id
    const id = req.params.id
    // validate the id, if not -> 404
    if (!ObjectID.isValid(id)) throw new Error()
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id,
    })
    if (!todo) throw new Error()

    return res.send({ todo })
  } catch (e) {
    return res.status(404).send()
  }
})

// PATCH /todos update
app.patch('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id

  // picks these two arguments and only if they exist
  const body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) res.status(404).send()

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  try {
    // findOneAndUpdate
    const todo = await Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id,
    }, {
      $set: body,
    }, {
      new: true,
    })
    if (!todo) res.status(404).send()
    return res.send({ todo })
  } catch (e) {
    return res.status(400).send()
  }
})


// POST /users
app.post('/users', async (req, res) => {
  try {
    // pick only email and password
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)
    await user.save()
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// use a callback authenticate (at middleware/auhenticate) as a middleware/pre-condition
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password'])
    const user = await User.findByCredentials(body.email, body.password)
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.status(400).send()
  }
})

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    return res.status(200).send()
  } catch (e) {
    return res.status(400).send()
  }
})


app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {
  app,
}
