const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const { errors } = err
    return ResponseHttpFactory.genericExceptionResponse(res, 400, err.toString(), errors)
  }

  return ResponseHttpFactory.genericExceptionResponse(res, err.status || 500, err.toString())
}
