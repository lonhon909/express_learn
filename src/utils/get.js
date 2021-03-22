module.exports = [
  {
    url: '/app',
    // res.send可以向前台发送数据，与原生node.js的res.write方法不同，它不止可以发送Buffer、字符串，还可以直接发送JSON等数据
    callback: function(req, res, next) {
      // res.send({
      //   error: 0,
      //   msg: '请求成功'
      // })
      // res.send(new Buffer('wahoo'));
      // res.send({ some: 'json' });
      res.send('<p>some html</p>');
      // res.send(404, 'Sorry, cant find that');
      // res.send(404);
    }
  },
  {
    url: '/second',
    callback: (req, res, next) => { // next方法的作用是用于对请求的多级处理
      if (Number(req.query.num) > 10) {
        // 满足条件时，才可触发同名的下一个路由。
        req.randomNum = Math.floor(Math.random() * 100); // 有时会需要给下一级的处理传参，只要直接给req实例中添加属性即可
        next()
      } else {
        res.send({
          error: 1,
          msg: '请输入大于10的数字'
        })
      }
    }
  },
  {
    url: '/second2',
    callback: (req, res, next) => {
      console.log(req.body)
      res.set('Cache-Control', 'max-age=30')
      res.send({
        error: 0,
        msg: `输入成功，接收到的随机数为${req.randomNum}`
      })
    }
  },
  {
    url: '/reg',
    callback: (req, res, next) => {
      console.log(req.query)
      res.send({
        error: 0,
        data: req.query,
        msg: '注册成功'
      })
    }
  }
]