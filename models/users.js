// 定义模型对象

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  roles: [{
    type: Number,
    required: true
  }],
  info: String
})
module.exports = mongoose.model('users', userSchema)
