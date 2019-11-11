/** Models */
const { User } = require('../models')

class UserController {
  async store (req, res) {
    const { body } = req
    // await UserValidator.validate(body, { abortEarly: false })
    // const users = await User.findAll()
    return res.json(body)
  }
}

module.exports = new UserController()
