const { sequelize } = require('../../src/app/models')

module.exports = () => {
  return Promise.all(
    Object.values(sequelize.models).map(model => {
      model.destroy({ where: {}, truncate: true, force: true })
    })
  )
}
