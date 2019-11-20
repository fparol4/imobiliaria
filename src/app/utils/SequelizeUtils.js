const { Op, Sequelize } = require('sequelize')

exports.insentiveLike = (fieldName, value) => {
  return Sequelize.where(
    Sequelize.fn('LOWER', Sequelize.col(fieldName)),
    { [Op.like]: `%${value}%` }
  )
}
