var express = require('express')
var bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => res.status(400).send(e)) // https://httpstatuses.com/
})

app.get('/todos', (req, res) => {
  Todo.find() // returns everything
  .then((todos) => {
    res.send({todos})
  }, (e) => res.status(400).send)
})

// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  // Valid id using isValid
    // if not found res 404 - send back empty body
  if (!ObjectID.isValid(id)) res.status(404).send({})

  // findById
  Todo.findById(id).then((todo) => {
    // if no todo - send back 404 with empty body
    if (!todo) res.status(404).send() // success
    res.send({todo})
  }).catch((e) => res.status(400).send()) // error 400 - send empty body back
})

app.delete('/todos/:id', (req, res) => {
  // get the id
  let id = req.params.id
  // validate the id, if not -> 404
  if (!ObjectID.isValid(id)) res.status(404).send()

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // if doc no deleted send 404
    if(!todo) res.status(404).send()

    // if deleted send back doc with 200
    res.send({todo})
  }).catch((e) => res.status(400).send())
})


app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {app}