const { Op } = require('sequelize')

/** Utils */
const Utils = require('../utils')

class FiltersFactory {
  static generateFilter (operation, city, neighbourhood, type, finality, animals, dorms, garage, minValue = 0, maxValue = Infinity) {
    const filtersObject = {
      operation,
      city
    }

    Utils.appendIfNotNull(filtersObject, operation, city, neighbourhood, type, finality, animals, dorms, garage)
    filtersObject.value = {
      [Op.gt]: minValue,
      [Op.lt]: maxValue
    }
  }
}

module.exports = FiltersFactory
