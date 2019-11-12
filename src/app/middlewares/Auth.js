const jwt = require('jsonwebtoken')
const { promisify } = require('util')

/** Models */
const { User } = require('../models')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  const [, token] = authorization.split(' ')
  const { id: userId } = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  req.user = await User.findByPk(userId)
  next()
}
