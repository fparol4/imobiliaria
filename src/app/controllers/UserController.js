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
    return ResponseHttpFactory.genericResponse(res, 201, 'User created with success', { user: user.visible() })
  }

  async show (req, res) {
    const { id } = req.params
    const requestUser = req.user
    const requestUserRole = requestUser.role.role_name
    const requestUserPermissions = AccessControl.can(requestUserRole)

    if (id === String(req.user.id)) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', { user: req.user.visible() })
    }

    if (!requestUserPermissions.readAny('user').granted) {
      throw new AuthenticationException()
    }

    const user = await User.findByPk(id)

    if (!user) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User not found', {})
    }

    return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', { user: user.visible() })
  }

  async update (req, res) {
    const { id } = req.params
    const body = req.body

    const requestUser = req.user
    const requestUserRole = requestUser.role.role_name
    const requestUserPermissions = AccessControl.can(requestUserRole)

    if (id === String(req.user.id) && !body.role_id) {
      if (!requestUserPermissions.updateOwn('user').granted) {
        throw new AuthenticationException()
      }

      const updatedUser = await requestUser.update(body)
      return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', { user: updatedUser.visible() })
    }

    if (!requestUserPermissions.updateAny('user').granted) {
      throw new AuthenticationException()
    }

    const user = await User.findByPk(id)

    if (!user) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User not found', {})
    }

    const updatedUser = await user.update(body)
    return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', { user: updatedUser.visible() })
  }
}

module.exports = new UserController()
