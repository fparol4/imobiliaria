const path = require('path')
require('dotenv').config({ path: require(path.resolve(__dirname, '..', 'env'))(process.env.NODE_ENV) })

/** Dependencies */
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

class App {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    // this.handlers()
  }

  middlewares () {
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(cors(path.resolve(__dirname, 'config', 'cors')))
  }

  routes () {
    this.app.use(`${process.env.API_VERSION}`, require('./routes'))
  }

  handler () {
    this.app.use(
      require(path.resolve(
        'app',
        'middlewares',
        'handlers',
        'exceptionHandler'
      ))
    )
  }
}

module.exports = new App().app
