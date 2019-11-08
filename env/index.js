const path = require('path')

const defaultEnv = (actualEnviroment) => {
  switch (actualEnviroment) {
    case 'production':
      return path.resolve(__dirname, '.env.production')
    default:
      return path.resolve(__dirname, '.env.development')
  }
}

module.exports = enviroment => defaultEnv(enviroment)
