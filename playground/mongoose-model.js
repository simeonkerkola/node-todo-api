// making a mongoose model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,  // mongoose validators
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

// var newTodo = new Todo({
//   text: 'Update weather ap',
//   completed: true,
//   completedAt: Date.now()
// })


// saving to database
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (e) => {
//   console.log('Unable to save todo')
// })


// User
// email - required, trim, type, set min length
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength:1
  }
})

var newUser = new User({
  email: ''
})

newUser.save().then((doc) => console.log('Saved User', doc),
(e) => console.log('Unable to save user'))