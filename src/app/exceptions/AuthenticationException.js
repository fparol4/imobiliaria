class AuthenticationException extends Error {
  constructor (message = 'Request level denied to perform this operation') {
    super(message)
    this.name = 'AuthenticationError'
    this.status = 401
  }
}

class TokenNotProvidedException extends Error {
  constructor (message = 'The required token was not sent') {
    super(message)
    this.name = 'AuthenticationError'
    this.status = 401
  }
}

class TokenException extends Error {
  constructor (message = 'The required token was not sent') {
    super(message)
    this.name = 'AuthenticationError'
    this.status = 401
  }
}

module.exports = AuthenticationException
module.exports.TokenNotProvidedException = TokenNotProvidedException
module.exports.TokenException = TokenException
