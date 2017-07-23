const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

// clears database before each test case
beforeEach((done) => {
  Todo.remove({}) // wipes out all todos
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

      Todo.find().then((todos) => {
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
        expect(todos.length).toBe(0)
        done()
      }).catch((e) => done(e))
    })
  })
})