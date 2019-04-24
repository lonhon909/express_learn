module.exports = [
  {
    url: '/login',
    callback: function(req, res) {
      console.log(req.body)
      res.send({
        error: 0,
        data: req.body,
        msg: '登陆成功'
      })
    }
  }
]