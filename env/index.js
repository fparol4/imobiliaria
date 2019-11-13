const path = require('path')

const enviroments = {
  production: '.env.production',
  test: '.env.test',
  development: '.env.development'
}

module.exports = require('dotenv').config({
  path: path.resolve(
    __dirname,
    enviroments[process.env.NODE_ENV] || '.env.development'
  )
})
