class PropertyImageExtensionNotAlowed extends Error {
  constructor (message = 'The property image extension are not alowed') {
    super(message)
    this.name = 'RequestError'
    this.status = 400
  }
}

class InvalidAmountOfImages extends Error {
  constructor (message = 'A property need to have at least one picture') {
    super(message)
    this.name = 'RequestError'
    this.status = 400
  }
}

class CouldNotBeFound extends Error {
  constructor (message = 'The required resource was not found') {
    super(message)
    this.name = 'RequestError'
    this.status = 400
  }
}

module.exports = { PropertyImageExtensionNotAlowed, InvalidAmountOfImages, CouldNotBeFound }
