const { Op, Sequelize } = require('sequelize')

const insentiveLike = (fieldName, value) => {
  return Sequelize.where(
    Sequelize.fn('LOWER', Sequelize.col(fieldName)),
    { [Op.like]: `%${value}%` }
  )
}

module.exports = { insentiveLike }
