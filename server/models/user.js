const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a vali d email'
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

// this method determines what exactly gets send back when mongoose model is
// converted to JSON value
UserSchema.methods.toJSON = function () {
  const user = this
  var userObject = user.toObject()

  // leaving off password and tokens array whick should not be returned
  return _.pick(userObject, ['_id', 'email'])
}

// arrow functions do not bind this keyword
UserSchema.methods.generateAuthToken = function () {
  const user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  user.tokens.push({access, token})

  return user.save().then(() => {
    return token
  })
}

// User
// email - required, trim, type, set min length, only unique emails
var User = mongoose.model('User', UserSchema)

module.exports = {User}