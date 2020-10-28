const express = require('express')
// const bodyParser = require('body-parser');

const UserModel = require('../models/users')
const roleModel = require('../models/roles')
const {setUser, commonData} = require('./common')
const {paginationFunc} = require('../utils/pagination')
const {commonCallBack, resFunc} = require('../utils/utils')
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
  paginationFunc(roleModel, req.query, filter, (data, err) => {
    res.send(resFunc(data, err, 200, !err))
  })
})

// 获取所有角色
router.get('/api/getAllRole', (req, res) => {
  roleModel.find({}, filter).then(roleList => {
    res.send(resFunc(roleList))
  })
})

// 获取用户列表
router.get('/api/getUserList', (req, res) => {
  paginationFunc(UserModel, req.query, filter, (data, err) => {
    res.send(resFunc(data, err, 200, !err))
  })
})

// 新增用户
router.post('/api/addUser', (req, res) => {
  console.log(req.body)
  const {account, roles, username, info} = req.body
  UserModel.find({account}).then(users => {
    if (users.length) {
      res.send(resFunc(null, '已存在相同账户！', 200, false))
    } else {
      UserModel.find({}).sort({'userId': -1}).limit(1).then(userList => {
        console.log(userList)
        const newUser = new UserModel({
          account,
          password: 123, 
          roles, 
          name: username,
          info: info || '',
          userId: userList[0].userId + 1
        })
        newUser.save(commonCallBack({success: '添加成功', error: '添加失败', res}))
      }).catch(err => {
        res.send(resFunc(err, '添加失败！', 200, false))
      })
    }
  
  })

  // })
})

// 更新用户
router.post('/api/updateUser', (req, res) => {
  const {userId, info, username, roles} = req.body
  UserModel.findOneAndUpdate({userId}, { info, name: username, roles}, {new: true, useFindAndModify: false}, (err) => {
    if (!err) res.send(resFunc(err, '修改成功', 200, !err))
    else res.send(resFunc(err, '修改失败', 200, !err))
  })
})

// 删除用户
router.get('/api/deleteUser/:id', (req, res) => {
  const {id} = req.params
  UserModel.findOneAndDelete({userId: id}, (err) => {
    if (!err) res.send(resFunc(null, '删除成功', 200, !err))
    else res.send(resFunc(err, '删除失败', 200, !err))
  })
})


module.exports = router
