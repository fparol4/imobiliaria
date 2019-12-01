const Moment = require('moment')
const { Op } = require('sequelize')

/** Models */
const { Property } = require('../models')

/** Exceptions */
const { AuthenticationException } = require('../exceptions/AuthenticationException')
const { PromotionValueException, PromotionDateException } = require('../exceptions/PromotionException')

/** Services */
const AuthenticationService = require('../services/AuthenticationService')

/** Responses */
const ResponseHttpFactory = require('../factory/ResponseHttpFactory')

class PromotionController {
  async store (req, res) {
    const { body: requestBody, user: requestUser } = req
    const { houseId: propertyId } = req.params
    const requestUserPermissions = AuthenticationService.userPermissions(requestUser)

    const property = await Property.findByPk(propertyId)

    if (property.value <= requestBody.promotion_value) {
      throw new PromotionValueException()
    }

    if (Moment(requestBody.promotion_end).diff(new Date()) < 0) {
      throw new PromotionDateException()
    }

    const promotionBody = { ...requestBody, in_promotion: true }

    if (property.owner_id === requestUser.id) {
      const updateProperty = await property.update(promotionBody)
      return ResponseHttpFactory.genericResponse(res, 200, 'Promotion created with success', updateProperty)
    }

    if (!requestUserPermissions.createAny('promotion').granted) {
      throw new AuthenticationException()
    }

    const updateProperty = await property.update(promotionBody)
    return ResponseHttpFactory.genericResponse(res, 200, 'Promotion created with success', updateProperty)
  }

  async update (req, res) {
    await Property.update({
      in_promotion: null,
      promotion_value: null,
      promotion_end: null
    },
    {
      where: {
        promotion_end: {
          [Op.lte]: Moment(new Date())
        }
      }
    })

    return ResponseHttpFactory.genericResponse(res, 200, 'Promotions updated with success')
  }
}

module.exports = new PromotionController()
