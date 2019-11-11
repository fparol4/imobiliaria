/** Routers */
const RootRouter = require('./RootRouter')
const UserRouter = require('./UserRouter')

class Router {
  constructor () {
    this.router = require('express').Router()
    this.routes()
  }

  routes () {
    this.router.route('/', RootRouter)
    this.router.use('/users', UserRouter)
  }
}

module.exports = new Router().router
