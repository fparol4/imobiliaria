const path = require('path')
require('dotenv').config({ path: require(path.resolve(__dirname, '..', '..', 'env'))(process.env.NODE_ENV) })

module.exports = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: false,
  logging: process.env.NODE_ENV !== 'production',
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true
  }
}
