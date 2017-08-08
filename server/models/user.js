const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

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
  // instance methods get called with individual document
  const user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  user.tokens.push({access, token})

  return user.save().then(() => {
    return token
  })
}

// everything added to a statics turns into a model method as opposed to a instance method
UserSchema.statics.findByToken = function (token) {
  // model methods get called with the model as the this binding
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return Promise.reject()
    }

  // to query a netsted document (.dot), wrap a value in quotes
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

// changes to the document before we save it
UserSchema.pre('save', function (next) {
  const user = this

  // returns true if pass was just modified
  if (user.isModified('password')) {
    //user.password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

// User
// email - required, trim, type, set min length, only unique emails
var User = mongoose.model('User', UserSchema)

module.exports = {User}