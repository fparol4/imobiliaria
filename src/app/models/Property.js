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
    Property.hasMany(models.File, { foreignKey: 'property_id', as: 'files' })
  }

  sequelizePaginate.paginate(Property)
  return Property
}
