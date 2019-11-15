/** Routers */
const RootRouter = require('./RootRouter')
const UserRouter = require('./UserRouter')
const SessionRouter = require('./SessionRouter')
const ImmobileRouter = require('./ImmobileRouter')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

class Router {
  constructor () {
    this.router = require('express').Router()
    this.routes()
  }

  routes () {
    this.router.route('/', RootRouter)
    this.router.use('/users', UserRouter)
    this.router.use('/sessions', SessionRouter)
    this.router.use('/apartments', ImmobileRouter)
  }
}

module.exports = new Router().router

/** Routes
router.get('', Controller.index)
router.post('', Controller.store)
router.get('/:id', Controller.show)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.destroy)
 */
