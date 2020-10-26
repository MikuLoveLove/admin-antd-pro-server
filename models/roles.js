// 定义模型对象

const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  roleId: {
    type: Number,
    unique: true,
    required: true
  },
  roleName: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String
  },
  userCount: {
    type: Number,
    required: true
  },
  createType: {
    type: Number,
    required: true
  },
  authority: [{
    type: String
  }]
})
module.exports = mongoose.model('roles', roleSchema)
