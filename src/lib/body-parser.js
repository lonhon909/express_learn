const querystring = require('querystring');
// 自己实现一个body-parser
module.exports = (req, res, next) => {
  let arr = []; // 接收数据的数组

  // 使用data事件接收数据
  req.on('data', function(buffer) {
    arr.push(buffer);
  })

  // 数据接收完成后，将数据转换为对象格式，保存到req.body上，交由下一级中间件处理
  req.on('end', function() {
    // 将数据解析为字符串
    let body = Buffer.concat(arr).toString();

    // 判断是否Fetch请求数据
    if (req.headers['content-type'] === 'application/json') {
      // 处理Fetch请求数据
      body = JSON.parse(body)
    } else {
      // 处理表单提交数据
      body = querystring.parse(body)
    }

    // 将保存到req.body上
    req.body = body

    // 交由下一级中间件处理
    next()
  })
}