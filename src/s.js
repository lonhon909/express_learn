const fs = require('fs');

fs.readFile('../static/index3.html', 'utf-8', (err, res) => {
  console.log(res)
})