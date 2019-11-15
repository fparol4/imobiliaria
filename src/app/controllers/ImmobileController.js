const { Op, Sequelize } = require('sequelize')

/** Models */
const { Immobile } = require('../models')

/** Exceptions */
const AuthenticationException = require('../exceptions/AuthenticationException')

/** Services */
const AuthenticationService = require('../services/AuthenticationService')

/** Utils */
const SequelizeUtils = require('../utils/SequelizeUtils')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

class ImmobileController {
  async store (req, res) {
    const { body: requestBody, user: requestUser } = req

    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    if (!requestUserPermissions.createOwn('home').granted) {
      throw new AuthenticationException()
    }

    const apartment = await Immobile.create(requestBody)
    return ResponseHttpFactory.genericResponse(res, 201, 'Property Ad Created Successfully', apartment)
  }

  async index (req, res) {
    const { page = 1, size = 20 } = req.query

    const immobiles = await Immobile.paginate({
      page,
      paginate: size,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'owner_id']
      }
    })

    return ResponseHttpFactory.genericResponse(res, 200, 'Properties Listed Successfully', immobiles)
  }
}

module.exports = new ImmobileController()

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
