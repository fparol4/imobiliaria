class UserCouldNotBeFound extends Error {
  constructor (message = 'The required user was not found') {
    super(message)
    this.name = 'RequestError'
    this.status = 404
  }
}

module.exports = { UserCouldNotBeFound }
