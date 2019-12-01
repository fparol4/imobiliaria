const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const AuthenticationControl = require('../../config/auth')

/** Configurations */
const JWTConfig = require('../../config/jwt')

/** Models */
const { User } = require('../models')

/** Exceptions */
const { UserCouldNotBeFound } = require('../exceptions/UserException')
const { AuthenticationException } = require('../exceptions/AuthenticationException')

class AuthenticationService {
  async generateToken (data) {
    return jwt.sign(data, JWTConfig.SECRET, { expiresIn: JWTConfig.TIME })
  }

  async auth ({ email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new UserCouldNotBeFound()
    }

    const passwordCompare = await user.comparePassword(password)

    if (!passwordCompare) {
      throw new AuthenticationException('Password sent does not match')
    }

    return this.generateToken({ id: user.id })
  }

  async authToken (authorization) {
    const [, token] = authorization.split(' ')
    const { id: userId } = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    return User.findByPk(userId, { include: 'role' })
  }

  userPermissions (user) {
    if (!user || !user.role.role_name) {
      throw new AuthenticationException()
    }

    return AuthenticationControl.can(user.role.role_name)
  }
}

module.exports = new AuthenticationService()
