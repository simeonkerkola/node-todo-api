var mongoose = require('mongoose')

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

module.exports = {User}