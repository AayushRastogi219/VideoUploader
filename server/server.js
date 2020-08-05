const http = require('http')
const app = require('./app')

const config = require('./config/default')

const server = http.createServer(app)
server.listen(config.port)

console.log('server is running on 127.0.0.1.'+config.port)
