/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库
  说明: 只有当连接上数据库后才去启动服务器
3. 使用中间件
 */
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const indexRouter = require('./routers')

const app = express()
// 声明使用静态中间件
app.use(express.static('public'))
// 请求参数是json结构
app.use(bodyParser.json())
// 声明解析post 请求中间件
app.use(bodyParser.urlencoded({extended: true}))
// 声明使用解析cookie数据的中间件
app.use(cookieParser())
// 路由中间件
app.use('/', indexRouter)

// 配置项
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
// 连接数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test', options).then(() => {
  console.log('连接数据库成功！')
  // 启动服务
  app.listen('5001', () => {
    console.log('服务器启动成功, 请访问: http://localhost:5001')
  })
}).catch(err => {
  console.log('数据库连接失败！', `错误：${err}`)
})
