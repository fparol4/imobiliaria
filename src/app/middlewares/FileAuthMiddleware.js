/** Services */
const AuthenticationService = require('../services/AuthenticationService')

/** Models */
const { Property } = require('../models')

/** Exceptions */
const { AuthenticationException } = require('../exceptions/AuthenticationException')
const { CouldNotBeFound } = require('../exceptions/ValidationException')

module.exports = async (req, res, next) => {
  const userPermissions = AuthenticationService.userPermissions(req.user)
  const { houseId } = req.params

  /** EU NÁO FAÇO IDEIA DO PORQUE FindOne ou FindByPk simplesmente BUGAM o multer */
  const house = await Property.findAll({ where: { id: houseId } })

  if (!house[0]) {
    throw new CouldNotBeFound()
  }

  req.house = house[0]

  if (house.owner_id === req.user.id) {
    next()
  }

  if (!userPermissions.updateAny('propertyFile')) {
    throw new AuthenticationException()
  }

  next()
}
