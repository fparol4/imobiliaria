const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return ResponseHttpFactory.genericExceptionResponse(res, 400, err.toString(), err.errors)
  }

  return ResponseHttpFactory.genericExceptionResponse(res, err.status || 500, err.toString(), err.errors)
}
