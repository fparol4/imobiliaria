const path = require('path')

const enviroments = {
  production: '.env.production',
  development: '.env.development'
}

require('dotenv').config({
  path: path.resolve(
    __dirname,
    enviroments[process.env.NODE_ENV] || '.env.development'
  )
})
