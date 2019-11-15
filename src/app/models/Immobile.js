const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Immobile = sequelize.define('Immobile', {
    area: DataTypes.FLOAT,
    dorms: DataTypes.INTEGER,
    garages: DataTypes.INTEGER,
    animals: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    neighbourhood: DataTypes.STRING,
    description: DataTypes.STRING,
    value: DataTypes.FLOAT,
    iptu: DataTypes.FLOAT,
    condominium: DataTypes.FLOAT,
    operation: DataTypes.STRING,
    finality: DataTypes.STRING
  })

  Immobile.associate = function (models) {
    Immobile.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' })
  }

  // Immobile.paginate = function (page = 0, pageSize = 20) {
  //   const offset = page * pageSize
  //   const limit = offset + pageSize
  //   return { offset, limit }
  // }

  sequelizePaginate.paginate(Immobile)
  return Immobile
}
