const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer')

const uploadRoute = require('./utils/upload');
const postRoute = require('./utils/post');
const getRoute = require('./utils/get');

const server = express();
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', "static/upload"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
// 设置允许跨域访问该服务.
server.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

const getIP = require('./utils/getIP');
const publicPath = path.join(__dirname, '../', "static");
// 设置保存上传文件路径
// const upload = multer({dest: path.join(publicPath, 'upload')});
const upload = multer({storage: storage})

// 日志
server.use(logger('short'));
// Express 内置的静态文件中间件
server.use(express.static(publicPath));
// 处理表单提交，对应请求头application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: false // 为true时将使用qs库处理数据，通常不需要
}))
// 处理fetch请求，对应请求头application/json
server.use(bodyParser.json())
// 处理上传文件
server.use(upload.any())

// server.use，处理所有方法的请求，它的第一个路由参数可以不传，此时表示处理所有接口请求
server.use(function(req, res, next) {
  console.log('no-url');
  next();
})
server.use('/app', function(req, res, next) {
  console.log('first');
  next();
})
/* 在程序中有可能还存在对动态路由请求响应静态文件情形，
例如，当用户访问 /users/123/profile_photo 路径时程序需要发送该用户的图片。
静态中间件本身时无法处理该需求 */
server.get("/users/:userid/profile_photo", function(req, res) {
  res.sendFile(getProfilePhotoPath(req.params.userid));
});
function getProfilePhotoPath(id) {
  return path.join(__dirname, '../', 'static/images/2.png')
}
server.get('/download', (req, res) => {
  res.download(path.join(__dirname, '../', 'static/json/address.json'))
})

postRoute.forEach(data => {
  server.post(data.url, data.callback)
})

uploadRoute.forEach(data => {
  server.post(data.url, data.callback)
})

getRoute.forEach(data => {
  server.get(data.url, data.callback)
})

// 前面都不匹配，则路由错误。返回 404 页面
server.use(function(req, res) {
  res.statusCode = 404;
  res.end("404");
});

server.listen(3000, () => {
  console.log(`http://${getIP()}:3000`)
})