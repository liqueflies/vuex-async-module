const micro = require('micro')
const serve = require('serve')
const fs = require('fs')
const path = require('path')

const server = micro((req, res) => {
  const pageFile = path.join(__dirname, '/example/index.html')
  fs.readFile(pageFile, (err, data) => {
    res.end(data)
  })
})

const sServer = serve(path.join(__dirname), {
  port: 3001,
  ignore: ['node_modules']
})

server.listen(3000)