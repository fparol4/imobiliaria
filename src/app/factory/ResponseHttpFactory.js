const response = (res, status, object) => {
  return res
    .status(status)
    .json(object)
}

class ResponseHttpFactory {
  genericResponse (res, status = 200, message = 'Request completed successfully', data = undefined) {
    const responseObject = { status, message, data }
    return response(res, status, responseObject)
  }

  genericExceptionResponse (res, status = 500, message = 'Internal Server Error', errors = undefined) {
    const responseObject = { status, message, errors }
    return response(res, status, responseObject)
  }
}

module.exports = new ResponseHttpFactory()
