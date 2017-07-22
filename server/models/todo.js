var mongoose = require('mongoose')

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

module.exports = {Todo}