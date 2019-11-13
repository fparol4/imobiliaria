/** Routers */
const RootRouter = require('./RootRouter')
const SessionRouter = require('./SessionRouter')
const UserRouter = require('./UserRouter')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

/** Routes
router.get('', Controller.index)
router.post('', Controller.store)
router.get('/:id', Controller.show)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.destroy)
 */

class Router {
  constructor () {
    this.router = require('express').Router()
    this.routes()
  }

  routes () {
    this.router.route('/', RootRouter)
    this.router.use('/sessions', SessionRouter)
    this.router.use('/users', UserRouter)

    this.router.get('/random', (req, res) => res.json())
  }
}

module.exports = new Router().router
