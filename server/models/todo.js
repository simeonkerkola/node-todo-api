const mongoose = require('mongoose')

// making a mongoose model
const Todo = mongoose.model('Todo', {
  text: {
    type: String, // mongoose validators
    required: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = { Todo }
