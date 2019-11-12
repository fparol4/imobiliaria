const jwt = require('jsonwebtoken')
const { promisify } = require('util')

/** Configurations */
const JWTConfig = require('../../config/jwt')

/** Models */
const { User } = require('../models')

class AuthenticationService {
  static async generateToken (data) {
    return jwt.sign(data, JWTConfig.SECRET, { expiresIn: JWTConfig.TIME })
  }

  static async auth ({ email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!(await user.comparePassword(password))) {
      throw new Error('JWT Authentication failed')
    }

    return this.generateToken({ id: user.id })
  }

  static async authToken (authorization) {
    const [, token] = authorization.split(' ')
    const { id: userId } = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    return User.findByPk(userId, { include: 'role' })
  }
}

module.exports = AuthenticationService
