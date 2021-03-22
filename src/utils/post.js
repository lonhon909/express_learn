function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        error: 0,
        data: 'req.body',
        msg: '登陆成功'
      })
    }, 500)
  })
}

function getlist() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        error: 0,
        data: 'req.body',
        msg: '登陆成功'
      })
    }, Math.floor(Math.random() * 5000))
  })
}

module.exports = [
  {
    url: '/login',
    callback: async function(req, res) {
      console.log(req.body)
      let response = await getData()
      res.send(response)
    }
  },
  {
    url: '/user.do',
    callback: async function(req, res) {
      console.log(res.body, 1)
      let response = await getlist();
      console.log(response)
      res.send(response);
    }
  }
]