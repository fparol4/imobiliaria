/** Services */
const AuthenticationService = require('../services/AuthenticationService')

/** Exceptions */
const { TokenNotProvidedException } = require('../exceptions/AuthenticationException')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new TokenNotProvidedException()
  }

  req.user = await AuthenticationService.authToken(authorization)
  next()
}
