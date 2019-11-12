const bcrypt = require('bcryptjs')

/** Models */
const { User } = require('../models')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

class SessionController {
  async store (req, res) {
    const { body } = req
    const jwtToken = await User.auth(body)
    return ResponseHttpFactory.genericResponse(res, 200, 'Authenticated with success', { token: jwtToken })
  }
}

module.exports = new SessionController()
