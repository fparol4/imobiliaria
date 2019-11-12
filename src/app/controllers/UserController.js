const AccessControl = require('../../config/auth')

/** Models */
const { User } = require('../models')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

/** Exceptions */
const AuthenticationException = require('../exceptions/AuthenticationException')

class UserController {
  async store (req, res) {
    const { body } = req
    const user = await User.create(body)
    return ResponseHttpFactory.genericResponse(res, 201, 'User created with success', user)
  }

  async show (req, res) {
    const { id } = req.params
    const requestUserPermissions = AccessControl.can('manager')

    if (id === String(req.user.id)) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', req.user.visible())
    }

    if (!requestUserPermissions.readAny('user').granted) {
      throw new AuthenticationException()
    }

    const user = await User.findByPk(id)
    return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', user.visible())
  }
}

module.exports = new UserController()
