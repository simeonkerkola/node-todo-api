const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
  _id: new ObjectID(),
  text: 'First text todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}]

// clears database before each test case
beforeEach((done) => {
  Todo.remove({}) // wipes out all todos
  .then(() => Todo.insertMany(todos)) // insert our arrays
  .then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text})   // sending text
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
    })
    .end((err, res) =>{
      if (err) done(err)

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done()
      }).catch((e) => done (e))
    })
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})     // send empty data
    .expect(400)
    .end((err, res) => {
      if (err) done(err)

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2)
        done()
      }).catch((e) => done(e))
    })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
    .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString()

    // make sure you get 404 back
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
    .end(done)
  })

  it('should return 404 for non-object ids', (done) => {
    // /todos/123 should fail
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
    .end(done)
  })
})