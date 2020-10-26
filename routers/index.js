const express = require('express')
// const bodyParser = require('body-parser');

const UserModel = require('../models/users')
const roleModel = require('../models/roles')
const {resFunc, setUser, commonData} = require('./common')
const router = express.Router()

// 过滤器
const filter = {password: 0, __v: 0}
// 解析请求体
// router.use(bodyParser.urlencoded({extended: false}))

// 用户登录
router.post('/api/userLogin', (req, res) => {
  const {username, password} = req.body
  UserModel.findOne({username, password}, filter).then((user) => {
    if (user) { // 登录成功
      res.cookie('user_id', user._id, {maxAge: 1000 * 60 * 60 * 24})
      const {roles, info, name, account, _id} = user._doc
      const data = {roleList: roles, info, name, account, uid: _id, currentAuthority: ['admin']}
      setUser(data)
      // 返回用户数据
      res.send(resFunc(data))
    } else {
      res.send(resFunc(null, '用户不存在', 200, false))
    }
  }).catch(err => {
    console.error('登录异常', err)
    res.send(resFunc(null, '登录异常', 5000, false))
  })
})

// 获取登录用户信息
router.get('/api/getUserInfo', (req, res) => {
  res.send(resFunc(commonData.user))
})

// 获取角色列表
router.get('/api/getRoleList', (req, res) => {
  roleModel.find({}, filter).then(roleList => {
    res.send(resFunc(roleList))
  })
  // res.send(resFunc(commonData.user))
})

// 获取所有角色
router.get('/api/getAllRole', (req, res) => {
  roleModel.find({}, filter).then(roleList => {
    res.send(resFunc(roleList))
  })
  // res.send(resFunc(commonData.user))
})

// 获取用户列表
router.get('/api/getUserList', (req, res) => {
  console.log(req.query)
  UserModel.find({}, filter).then(userList => {
    res.send(resFunc(userList))
  })
  // res.send(resFunc(commonData.user))
})
// router.use((req, res) => {
//   res.redirect('/');
// })


module.exports = router
