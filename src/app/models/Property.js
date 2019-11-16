const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    area: DataTypes.FLOAT,
    dorms: DataTypes.INTEGER,
    toilets: DataTypes.INTEGER,
    garages: DataTypes.INTEGER,
    animals: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    neighbourhood: DataTypes.STRING,
    description: DataTypes.STRING,
    value: DataTypes.FLOAT,
    iptu: DataTypes.FLOAT,
    condominium: DataTypes.FLOAT,
    operation: DataTypes.STRING,
    finality: DataTypes.STRING,
    promotion_value: DataTypes.FLOAT,
    promotion_end: DataTypes.DATE,
    in_promotion: DataTypes.BOOLEAN
  })

  Property.associate = function (models) {
    Property.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' })
  }

  // Immobile.paginate = function (page = 0, pageSize = 20) {
  //   const offset = page * pageSize
  //   const limit = offset + pageSize
  //   return { offset, limit }
  // }

  sequelizePaginate.paginate(Property)
  return Property
}
