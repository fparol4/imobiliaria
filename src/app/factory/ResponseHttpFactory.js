class ResponseHttpFactory {
  static genericResponse (res, status = 200, message = 'Request completed successfully', data = {}) {
    const responseObject = { status, message, data }
    return this.response(res, status, responseObject)
  }

  static genericExceptionResponse (res, status = 500, message = 'Internal Server Error', errors = undefined) {
    const responseObject = { status, message, errors }
    return this.response(res, status, responseObject)
  }

  static response (res, status, object) {
    return res
      .status(status)
      .json(object)
  }
}

module.exports = ResponseHttpFactory
