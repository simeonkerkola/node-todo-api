const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// bcrypt example
const password = '123abc!'

// create salts. Using 10 rounds, bigger the number the longer the algorithm can take
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

// test if password matches the hash
const hashedPassword = '$2a$10$wH0IC6zMuZFOQhqtNhwEWeAi28P1ixwGDdMijSQZ1XFha5PAx8XOa'
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// jwt example
// const data = {
//   id: 10
// }
//
// const token = jwt.sign(data, '123abc')
// console.log(token)
//
// const decoded = jwt.verify(token, '123abc')
// console.log('decoded:', decoded)


// crypto-js example
// const message = 'i am user number 3'
// var hash = SHA256(message).toString()
//
// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)
//
// const data = {
//   id: 4
// }
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secretsalt').toString()
// }
//
// // // man in the middle
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()
//
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'secretsalt').toString()
// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed. do not trust!')
// }