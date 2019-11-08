/** Models */
// const { User } = require('../models')

/** Validator */
const UserValidator = require('../validators/UserValidator')

class UserController {
  async store (req, res) {
    const { body } = req
    await UserValidator.validateAsync(body)
    return res.json(body)
  }
}

module.exports = new UserController()
