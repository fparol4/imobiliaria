/** Services */
const AuthenticationService = require('../services/AuthenticationService')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  req.user = await AuthenticationService.authToken(authorization)
  next()
}
