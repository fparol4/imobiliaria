/** Models */
const { User } = require('../models')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

/** Exceptions */
const AuthenticationException = require('../exceptions/AuthenticationException')

/** Services */
const AuthenticationService = require('../services/AuthenticationService')

class UserController {
  async store (req, res) {
    const { body: requestBody } = req
    const user = await User.create(requestBody)
    return ResponseHttpFactory.genericResponse(res, 201, 'User created with success', user.visible())
  }

  async show (req, res) {
    const { id: userId } = req.params
    const { user: requestUser } = req

    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    if (userId === String(req.user.id)) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', req.user.visible())
    }

    if (!requestUserPermissions.readAny('user').granted) {
      throw new AuthenticationException()
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User not found')
    }

    return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', user.visible())
  }

  async update (req, res) {
    const { id: userId } = req.params
    const { body: requestBody, user: requestUser } = req

    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    if (userId === String(req.user.id) && !requestBody.role_id) {
      if (!requestUserPermissions.updateOwn('user').granted) {
        throw new AuthenticationException()
      }

      const updatedUser = await requestUser.update(requestBody)
      return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', updatedUser.visible())
    }

    if (!requestUserPermissions.updateAny('user').granted) {
      throw new AuthenticationException()
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return ResponseHttpFactory.genericResponse(res, 200, 'User not found')
    }

    const updatedUser = await user.update(requestBody)
    return ResponseHttpFactory.genericResponse(res, 200, 'User find with success', updatedUser.visible())
  }

  async index (req, res) {
    res.json(await User.findAll({ include: ['role'] }))
  }
}

module.exports = new UserController()
