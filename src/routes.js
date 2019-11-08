/** Controllers */
const UserController = require('./app/controllers/UserController')

class Router {
  constructor () {
    this.router = require('express').Router()
    this.routes()
  }

  routes () {
    this.router.route('/')
      .get((req, res) => res.json({ ok: true }))

    this.router.route('/users')
      .post(UserController.store)
  }
}

module.exports = new Router().router
