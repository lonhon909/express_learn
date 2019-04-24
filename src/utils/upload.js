module.exports = [
  {
    url: '/upload',
    callback: function(req, res) {
      // console.log(req.body)
      // console.log(req.files)
      res.send(JSON.stringify({
        message:'File uploade~d successfully', 
        filename:req.files[0].originalname
      }))
    }
  }
]