const fs = require('fs')
const util = require('util')
const path = require('path')

const unlink = util.promisify(fs.unlink)

const { File } = require('../models')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

/** Exceptions */
const { CouldNotBeFound } = require('../exceptions/ValidationException')

const tmpPath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'images')

class PropertyFilesController {
  async store (req, res) {
    const { house, files: requestFiles } = req

    const propertyFiles = requestFiles.reduce((prev, curr) => {
      const fileObject = { file_name: curr.filename, original_name: curr.originalname, property_id: house.id }
      prev.push(fileObject)
      return prev
    }, [])

    const files = await File.bulkCreate(propertyFiles)
    return ResponseHttpFactory.genericResponse(res, 201, 'Property File Created Successfully', files)
  }

  async delete (req, res) {
    const { id: fileId } = req.params
    const file = await File.findByPk(fileId)

    if (!file) {
      throw new CouldNotBeFound()
    }

    await unlink(`${tmpPath}/${file.file_name}`)
    await file.destroy()

    return ResponseHttpFactory.genericResponse(res, 201, 'Property File Deleted Successfully')
  }

  async show (req, res) {
    const { id: fileId } = req.params
    const file = await File.findByPk(fileId)

    if (!file) {
      throw new CouldNotBeFound()
    }

    return res.sendFile(`${tmpPath}/${file.file_name}`)
  }
}

module.exports = new PropertyFilesController()
