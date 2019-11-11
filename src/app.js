const path = require('path')
require(path.resolve(__dirname, '..', 'env'))

/** Dependencies */
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
require('express-async-errors')

class App {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.handlers()
  }

  middlewares () {
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors(path.resolve(__dirname, 'config', 'cors')))
  }

  routes () {
    this.app.use(`${process.env.API_VERSION}`, require('./routes'))
  }

  handlers () {
    this.app.use(
      require(
        path.resolve(
          'src',
          'app',
          'middlewares',
          'handlers',
          'exceptionHandler'
        ))
    )
  }
}

module.exports = new App().app
