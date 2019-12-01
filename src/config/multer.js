const path = require('path')
const uniqid = require('uniqid')
const multer = require('multer')

/** Exceptions */
const ValidationException = require('../app/exceptions/ValidationException')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'images'))
  },

  filename: (req, file, cb) => {
    cb(null, `${uniqid()}${path.extname(file.originalname)}`)
  }
})

module.exports = multer({
  fileFilter: (req, file, cb) => {
    if (!['.jpeg', '.jpg', '.png'].includes(path.extname(file.originalname))) {
      return cb(new ValidationException.PropertyImageExtensionNotAlowed(), false)
    }
    return cb(null, true)
  },

  storage
})
