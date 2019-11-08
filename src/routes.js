class Router {
  constructor () {
    this.router = require('express').Router()
    this.routes()
  }

  routes () {
    this.router.route('/')
      .get((req, res) => res.json({ ok: true }))
  }
}

module.exports = new Router().router
