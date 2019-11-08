const http = require('http')
const io = require('socket.io')
const app = require('./app')

class Server {
  constructor () {
    this.server = http.Server(app)
    this.io = io(this.server)
    this.run()
  }

  run () {
    this.server.listen(process.env.PORT)
    console.log(`Server ONLINE: ${process.env.HOST}:${process.env.PORT}`)
  }
}

module.exports = new Server()
