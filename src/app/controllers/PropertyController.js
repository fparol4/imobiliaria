const { Op, Sequelize } = require('sequelize')
const fs = require('fs')
const { promisify } = require('util')

const asyncRemoveFile = promisify(fs.unlink)

/** Models */
const { Property, File } = require('../models')

/** Exceptions */
const { AuthenticationException } = require('../exceptions/AuthenticationException')
const ValidationException = require('../exceptions/ValidationException')

/** Services */
const AuthenticationService = require('../services/AuthenticationService')

/** Utils */
const PropertyUtils = require('../utils/PropertyUtils')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

class PropertiesController {
  async store (req, res) {
    const { body: requestBody, user: requestUser } = req
    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    if (!requestUserPermissions.createOwn('home').granted) {
      throw new AuthenticationException()
    }

    const apartment = await Property.create({
      ...requestBody,
      owner_id: requestUser.id
    })

    return ResponseHttpFactory.genericResponse(res, 201, 'Property Ad Created Successfully', apartment)
  }

  async index (req, res) {
    const { page = 1, size = 20 } = req.query

    const properties = await Property.paginate({
      page,
      paginate: size,
      order: [
        ['in_promotion', 'ASC'],
        ['created_at', 'DESC']
      ],
      include: ['files']
    })

    const propertiesResponse = { ...properties, docs: PropertyUtils.manageProperties(properties.docs) }

    return ResponseHttpFactory.genericResponse(res, 200, 'Properties Listed Successfully', propertiesResponse)
  }

  async update (req, res) {
    const { body: requestBody, user: requestUser } = req
    const { id: propertyId } = req.params
    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    const property = await Property.findByPk(propertyId)

    if (!property) {
      throw new ValidationException.CouldNotBeFound()
    }

    if (property.owner_id === requestUser.id) {
      const filteredBody = requestUserPermissions.updateOwn('home').filter(requestBody)
      const updateProperty = await property.update(filteredBody)
      return ResponseHttpFactory.genericResponse(res, 200, 'Properties Listed Successfully', updateProperty)
    }

    if (!requestUserPermissions.updateAny('home').granted) {
      throw new AuthenticationException()
    }

    const filteredBody = requestUserPermissions.updateAny('home').filter(requestBody)
    const updateProperty = await property.update(filteredBody)
    return ResponseHttpFactory.genericResponse(res, 200, 'Properties Listed Successfully', updateProperty)
  }

  async delete (req, res) {
    const { user: requestUser } = req
    const { id: propertyId } = req.params
    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    const property = await Property.findByPk(propertyId)

    if (!property) {
      throw new ValidationException.CouldNotBeFound()
    }

    if (property.owner_id === requestUser.id) {
      await property.destroy()
      return ResponseHttpFactory.genericResponse(res, 200, 'Property deleted successfully')
    }

    if (!requestUserPermissions.deleteAny('home').granted) {
      throw new AuthenticationException()
    }

    await property.destroy()
    return ResponseHttpFactory.genericResponse(res, 200, 'Property deleted successfully')
  }
}

module.exports = new PropertiesController()

// const immobiles = await Immobile.paginate({
//   page,
//   paginate: size,
//   attributes: {
//     exclude: ['createdAt', 'updatedAt', 'owner_id']
//   },
//   where: {
//     /**
//      * Gambiarra para adicionar case insensitive no MySQL/MariaDB
//      * $insentive é inútil e não é repassado para a query, mas necessário para o objeto
//      */
//     $insensitive_1: SequelizeUtils.insentiveLike('city', 'mau')
//   }
// })
