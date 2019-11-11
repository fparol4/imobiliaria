const ResponseHttpFactory = require('../../factory/ResponseHttpFactory')

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const { errors } = err
    return ResponseHttpFactory.genericExceptionResponse(res, 400, err.name, errors)
  }
  console.log(err)
  return ResponseHttpFactory.genericExceptionResponse(res, 500, err.name)
}
