const mongoose = require('mongoose')
const validator = require('validator')


// {
//   email: 'example@example.com',
//   password: 'assddf45sd0fg87hd23fghdf',
//   tokens: [{
//     access: 'auth',
//     token: 'sdfrghyfljhe43iutkjfqo93iu5iw'
//   }]
// }

// User
// email - required, trim, type, set min length, only unique emails
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

module.exports = {User}