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
    }, 5000)
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
      let response = await getlist();
      res.send(response);
    }
  }
]