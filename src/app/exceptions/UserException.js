class UserCouldNotBeFound extends Error {
  constructor (message = 'The required user was not found') {
    super(message)
    this.name = 'RequestError'
    this.status = 400
  }
}

module.exports = UserCouldNotBeFound
