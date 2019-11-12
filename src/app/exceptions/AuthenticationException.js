class AuthenticationException extends Error {
  constructor (message = 'Request level denied to perform this operation') {
    super(message)
    this.name = 'AuthenticationError'
    this.status = 401
  }
}

module.exports = AuthenticationException
