const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
// 引入Multer
const multer = require('multer')
// 使用自己实现的 body-parser
// const bodyParser = require('./lib/body-parser');

const server = express();
server.listen(3000, function() {
  console.log('服务已启动，监听端口：3000')
})
server.use(logger("short"))
// 处理静态文件
server.use(express.static('./static/'))
// 处理表单提交，对应请求头application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: false // 为true时将使用qs库处理数据，通常不需要
}))
// 处理fetch请求，对应请求头application/json
server.use(bodyParser.json())

// 设置保存上传文件路径
const upload = multer({
  dest: './static/upload'
})
// 处理上传文件
server.use(upload.any())
// 使用自己实现的 body-parser
// server.use(bodyParser)

// server.use，处理所有方法的请求，它的第一个路由参数可以不传，此时表示处理所有接口请求
server.use(function(req, res, next) {
  // console.log('no-url');
  next();
})
server.use('/app', function(req, res, next) {
  // console.log('first');
  next();
})

// res.send可以向前台发送数据，与原生node.js的res.write方法不同，它不止可以发送Buffer、字符串，还可以直接发送JSON等数据
server.get('/app', function(req, res, next) {
  // res.send({
  //   error: 0,
  //   msg: '请求成功'
  // })
  // res.send(new Buffer('wahoo'));
  // res.send({ some: 'json' });
  res.send('<p>some html</p>');
  // res.send(404, 'Sorry, cant find that');
  // res.send(404);
})

// 若配置了多个同名路由，代码会从上到下按顺序执行，但如果未调用next方法，执行过程会中断
// server.get('/second', (req, res, next) => { // next方法的作用是用于对请求的多级处理
//   if (Number(req.query.num) > 10) {
//     // 满足条件时，才可触发同名的下一个路由。
//     req.randomNum = Math.floor(Math.random() * 100); // 有时会需要给下一级的处理传参，只要直接给req实例中添加属性即可
//     next()
//   } else {
//     res.send({
//       error: 1,
//       msg: '请输入大于10的数字'
//     })
//   }
// })
server.get('/second', (req, res, next) => {
  console.log(req.query)
  res.set('Cache-Control', 'max-age:30')
  res.send({
    error: 0,
    msg: `输入成功，接收到的随机数1为${req.randomNum}`
  })
})

server.get('/reg', (req, res, next) => {
  // console.log(req.query)
  res.send({
    error: 0,
    data: req.query,
    msg: '注册成功'
  })
})
server.post('/login', (req, res, next) => {
  // console.log(req.body)
  res.send({
    error: 0,
    data: req.body,
    msg: '登陆成功'
  })
})

// 接收文件上传结果
server.post('/upload', (req, res, next) => {
  // console.log(req.body)
  // console.log(req.files)
  res.send({
    error: 0,
    data: req.body,
    msg: '上传成功'
  })
})