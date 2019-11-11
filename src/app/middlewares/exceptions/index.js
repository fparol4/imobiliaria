const ResponseHttpFactory = require('../../factory/ResponseHttpFactory')

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const { details } = err
    return ResponseHttpFactory.genericExceptionResponse(res, 400, err.name, details.map(message => message.message))
  }

  return ResponseHttpFactory.genericExceptionResponse(res, 500, err.name)
}
